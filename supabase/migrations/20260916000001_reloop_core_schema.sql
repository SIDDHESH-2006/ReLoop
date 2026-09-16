-- ==============================================================================
-- Migration: 20260916000001_initial_schema.sql
-- Description: Core Schema for ReLoop (Campus Circular Economy Platform)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE item_pathway AS ENUM (
    'sell',
    'donate',
    'exchange',
    'repair',
    'upcycle',
    'recycle'
);

CREATE TYPE item_condition AS ENUM (
    'brand_new',
    'like_new',
    'good',
    'fair',
    'for_parts'
);

CREATE TYPE item_status AS ENUM (
    'draft',
    'available',
    'reserved',
    'completed',
    'archived'
);

CREATE TYPE transaction_type AS ENUM (
    'sale',
    'donation',
    'exchange',
    'recycle_dropoff'
);

CREATE TYPE transaction_status AS ENUM (
    'initiated',
    'pending_pickup',
    'verified',
    'cancelled'
);

CREATE TYPE repair_ticket_status AS ENUM (
    'reported',
    'assessing',
    'repairing',
    'repaired',
    'unfixable',
    'collected'
);

-- 3. PROFILES TABLE (Linked with Supabase Auth)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    phone_number TEXT,
    hostel_block TEXT NOT NULL,          -- e.g. "Hostel A", "Block 4"
    room_number TEXT,
    eco_points INTEGER DEFAULT 0 NOT NULL,
    reputation_score NUMERIC(3, 2) DEFAULT 5.00 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. CAMPUS HUBS TABLE
-- Designated spots on campus: e-waste bins, drop-off spots, repair kiosks
CREATE TABLE public.campus_hubs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    hub_type TEXT NOT NULL,              -- 'drop_off', 'repair_station', 'recycle_point'
    description TEXT,
    hostel_or_building TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    operating_hours TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. ITEMS TABLE (Core circular economy listings)
CREATE TABLE public.items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,              -- 'electronics', 'books', 'furniture', 'appliances', etc.
    condition item_condition NOT NULL,
    pathway item_pathway NOT NULL,       -- Determined via Decision Engine or user selection
    price NUMERIC(10, 2) DEFAULT 0.00,  -- 0 for donate/recycle
    is_free BOOLEAN GENERATED ALWAYS AS (price = 0 OR pathway IN ('donate', 'recycle')) STORED,
    status item_status DEFAULT 'available' NOT NULL,
    images TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
    
    -- Geospatial matching data
    hostel_block TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    
    -- Circular Decision Engine Insights
    decision_engine_metadata JSONB DEFAULT '{}'::JSONB, 
    -- e.g. {"confidence": 0.92, "suggested_price_min": 100, "suggested_price_max": 200, "carbon_estimate_kg": 2.5}
    
    views_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance & campus map
CREATE INDEX idx_items_pathway ON public.items(pathway);
CREATE INDEX idx_items_status ON public.items(status);
CREATE INDEX idx_items_category ON public.items(category);
CREATE INDEX idx_items_location ON public.items(latitude, longitude);

-- 6. DIGITAL PRODUCT PASSPORT (Chain of Custody Events)
-- Tracks the lifecycle journey of campus items (Page 5: Digital Passport)
CREATE TABLE public.item_passport_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,           -- 'listed', 'ownership_transferred', 'repaired', 'upcycled', 'recycled'
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    hub_id UUID REFERENCES public.campus_hubs(id) ON DELETE SET NULL,
    notes TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_passport_item_id ON public.item_passport_events(item_id);

-- 7. TRANSACTIONS & HANDOFFS TABLE
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    giver_seller_id UUID NOT NULL REFERENCES public.profiles(id),
    receiver_buyer_id UUID NOT NULL REFERENCES public.profiles(id),
    type transaction_type NOT NULL,
    status transaction_status DEFAULT 'initiated' NOT NULL,
    final_price NUMERIC(10, 2) DEFAULT 0.00,
    verification_code TEXT,             -- 4 or 6 digit code for physical handoff confirmation
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_transactions_users ON public.transactions(giver_seller_id, receiver_buyer_id);

-- 8. REPAIR TICKETS TABLE
-- For campus repair reporting & workflows
CREATE TABLE public.repair_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES public.items(id) ON DELETE SET NULL,
    reporter_id UUID NOT NULL REFERENCES public.profiles(id),
    hub_id UUID REFERENCES public.campus_hubs(id) ON DELETE SET NULL,
    item_name TEXT NOT NULL,
    issue_description TEXT NOT NULL,
    estimated_cost NUMERIC(10, 2),
    actual_cost NUMERIC(10, 2),
    status repair_ticket_status DEFAULT 'reported' NOT NULL,
    photos TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. CAMPUS CHAT & COORDINATION
CREATE TABLE public.chat_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES public.items(id) ON DELETE CASCADE,
    participant_one UUID NOT NULL REFERENCES public.profiles(id),
    participant_two UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_participants_per_item UNIQUE (item_id, participant_one, participant_two)
);

CREATE TABLE public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id),
    message_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_chat_messages_room ON public.chat_messages(room_id, created_at);

-- 10. IMPACT LOGS TABLE (Environmental Footprint)
CREATE TABLE public.impact_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    item_id UUID REFERENCES public.items(id) ON DELETE SET NULL,
    pathway item_pathway NOT NULL,
    carbon_saved_kg NUMERIC(8, 2) DEFAULT 0.00 NOT NULL,
    waste_diverted_kg NUMERIC(8, 2) DEFAULT 0.00 NOT NULL,
    money_saved_inr NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_impact_user_id ON public.impact_logs(user_id);

-- 11. HELPER TRIGGER FOR updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_items_modtime BEFORE UPDATE ON public.items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_modtime BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_repair_tickets_modtime BEFORE UPDATE ON public.repair_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 12. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_hubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.item_passport_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, owner update
CREATE POLICY "Public profiles are readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Campus Hubs: Public read
CREATE POLICY "Campus hubs are readable by everyone" ON public.campus_hubs FOR SELECT USING (true);

-- Items: Available items readable by all, owners can insert/update/delete
CREATE POLICY "Anyone can view active items" ON public.items FOR SELECT USING (status != 'archived' OR auth.uid() = owner_id);
CREATE POLICY "Authenticated users can create items" ON public.items FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update their items" ON public.items FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete their items" ON public.items FOR DELETE USING (auth.uid() = owner_id);

-- Passport Events: Public read, authenticated insert
CREATE POLICY "Passport events are readable by everyone" ON public.item_passport_events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can log passport events" ON public.item_passport_events FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Chat Messages: Participants only
CREATE POLICY "Room participants can view chat messages" ON public.chat_messages FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.chat_rooms r 
        WHERE r.id = chat_messages.room_id 
        AND (r.participant_one = auth.uid() OR r.participant_two = auth.uid())
    )
);
CREATE POLICY "Room participants can send messages" ON public.chat_messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND EXISTS (
        SELECT 1 FROM public.chat_rooms r 
        WHERE r.id = chat_messages.room_id 
        AND (r.participant_one = auth.uid() OR r.participant_two = auth.uid())
    )
);
