-- ==============================================================================
-- ReLoop: Demo Seed Data
-- Target: supabase/seed/seed.sql
-- ==============================================================================

-- 1. DEMO PROFILES (Simulated Campus Students)
-- Uses deterministic UUIDs so foreign keys align perfectly
INSERT INTO public.profiles (id, email, full_name, hostel_block, room_number, eco_points, reputation_score)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'aarav.sharma@campus.edu', 'Aarav Sharma', 'A', 'A-204', 180, 4.90),
    ('a0000000-0000-0000-0000-000000000002', 'diya.patel@campus.edu', 'Diya Patel', 'B', 'B-112', 320, 4.95),
    ('a0000000-0000-0000-0000-000000000003', 'rohan.verma@campus.edu', 'Rohan Verma', 'C', 'C-301', 95, 4.75),
    ('a0000000-0000-0000-0000-000000000004', 'ananya.iyer@campus.edu', 'Ananya Iyer', 'D', 'D-415', 240, 5.00)
ON CONFLICT (id) DO NOTHING;

-- 2. CAMPUS HUBS (Physical Drop-offs, Repair Kiosks, E-waste Bins)
INSERT INTO public.campus_hubs (id, name, hub_type, description, hostel_or_building, latitude, longitude, operating_hours, is_active)
VALUES
    ('b0000000-0000-0000-0000-000000000001', 'Block A Drop-Off Point', 'drop_off', 'Ground floor lobby shelf for contactless peer pickup and donation drops.', 'Block A', 19.0760, 72.8777, '24/7', true),
    ('b0000000-0000-0000-0000-000000000002', 'Block B Drop-Off Point', 'drop_off', 'Common room shelf for peer handoffs.', 'Block B', 19.0763, 72.8780, '24/7', true),
    ('b0000000-0000-0000-0000-000000000003', 'Central E-Waste Bin', 'recycle_point', 'Designated safe bin for broken electronics, cables, batteries, and appliances.', 'Admin Block', 19.0755, 72.8790, 'Mon-Sat: 8 AM - 6 PM', true),
    ('b0000000-0000-0000-0000-000000000004', 'Campus Repair Kiosk', 'repair_station', 'Student-run repair workshop with soldering irons, basic electronics parts, and tools.', 'Workshop Wing', 19.0758, 72.8785, 'Mon-Sat: 4 PM - 8 PM', true),
    ('b0000000-0000-0000-0000-000000000005', 'Library Book Exchange Shelf', 'drop_off', 'Take a book, leave a book circular rack.', 'Central Library', 19.0750, 72.8775, 'Mon-Sat: 9 AM - 9 PM', true)
ON CONFLICT (id) DO NOTHING;

-- 3. ITEMS (Sample listings across all 6 circular pathways)
INSERT INTO public.items (id, owner_id, title, description, category, condition, pathway, price, status, images, hostel_block, latitude, longitude, views_count)
VALUES
    -- Sell
    (
        'c0000000-0000-0000-0000-000000000001',
        'a0000000-0000-0000-0000-000000000001',
        'Casio FX-991EX Scientific Calculator',
        'Used for 2 semesters. Classwiz display, solar backup works perfectly. Original slide-on cover included.',
        'electronics',
        'like_new',
        'sell',
        750.00,
        'available',
        ARRAY['https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600'],
        'A',
        19.0760,
        72.8777,
        42
    ),
    (
        'c0000000-0000-0000-0000-000000000002',
        'a0000000-0000-0000-0000-000000000002',
        'Ergonomic Mesh Study Chair',
        'Adjustable height with breathable mesh back. Rolling casters recently serviced.',
        'furniture',
        'good',
        'sell',
        1200.00,
        'available',
        ARRAY['https://images.unsplash.com/photo-1580481077195-c228c3b88b49?w=600'],
        'B',
        19.0763,
        72.8780,
        89
    ),
    (
        'c0000000-0000-0000-0000-000000000003',
        'a0000000-0000-0000-0000-000000000003',
        'Pigeon 1.5L Electric Kettle',
        'Boils water quickly, auto shut-off functional. Moving out next week so selling cheap.',
        'appliances',
        'good',
        'sell',
        400.00,
        'available',
        ARRAY['https://images.unsplash.com/photo-1594213114663-d94db926212a?w=600'],
        'C',
        19.0766,
        72.8783,
        31
    ),

    -- Donate
    (
        'c0000000-0000-0000-0000-000000000004',
        'a0000000-0000-0000-0000-000000000004',
        'Engineering Mathematics Vol 2 (BS Grewal)',
        'Classic textbook for first/second years. Clean pages, no torn sheets. Free for juniors!',
        'books',
        'good',
        'donate',
        0.00,
        'available',
        ARRAY['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600'],
        'D',
        19.0770,
        72.8786,
        57
    ),
    (
        'c0000000-0000-0000-0000-000000000005',
        'a0000000-0000-0000-0000-000000000001',
        'Plastic Bucket & Mug Set (20L)',
        'Heavy duty plastic bucket with mug. Cleaned and disinfected. Vacating hostel.',
        'other',
        'good',
        'donate',
        0.00,
        'available',
        ARRAY['https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600'],
        'A',
        19.0760,
        72.8777,
        18
    ),

    -- Exchange
    (
        'c0000000-0000-0000-0000-000000000006',
        'a0000000-0000-0000-0000-000000000002',
        'Yonex Badminton Rackets Pair',
        'Pair of Yonex GR 303 rackets with carrying bag. Looking to exchange for dumbbell weights (5kg-10kg).',
        'other',
        'good',
        'exchange',
        0.00,
        'available',
        ARRAY['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600'],
        'B',
        19.0763,
        72.8780,
        34
    ),

    -- Repair
    (
        'c0000000-0000-0000-0000-000000000007',
        'a0000000-0000-0000-0000-000000000003',
        'Crompton Desk Table Fan',
        'Motor runs fine, but the power cord has a loose connection near the plug. Dropping at campus kiosk.',
        'appliances',
        'fair',
        'repair',
        0.00,
        'available',
        ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
        'C',
        19.0766,
        72.8783,
        22
    ),

    -- Upcycle
    (
        'c0000000-0000-0000-0000-000000000008',
        'a0000000-0000-0000-0000-000000000004',
        'Handcrafted Wooden Crate Bookshelf',
        'Repurposed mango wood shipping crate sanded, varnished, and converted into a 2-tier desk organizer.',
        'furniture',
        'good',
        'upcycle',
        250.00,
        'available',
        ARRAY['https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600'],
        'D',
        19.0770,
        72.8786,
        45
    ),

    -- Recycle
    (
        'c0000000-0000-0000-0000-000000000009',
        'a0000000-0000-0000-0000-000000000001',
        'Dead Dell Laptop Battery & Power Brick',
        'Old swollen lithium battery and non-working 65W charger. Depositing in e-waste bin.',
        'electronics',
        'for_parts',
        'recycle',
        0.00,
        'available',
        ARRAY['https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600'],
        'A',
        19.0760,
        72.8777,
        15
    )
ON CONFLICT (id) DO NOTHING;

-- 4. DIGITAL PRODUCT PASSPORT EVENTS (Chain of custody demo for the Study Chair)
INSERT INTO public.item_passport_events (id, item_id, event_type, actor_id, hub_id, notes, created_at)
VALUES
    (
        'd0000000-0000-0000-0000-000000000001',
        'c0000000-0000-0000-0000-000000000002',
        'listed',
        'a0000000-0000-0000-0000-000000000001',
        NULL,
        'Item first introduced to ReLoop campus network by 4th year senior.',
        NOW() - INTERVAL '180 days'
    ),
    (
        'd0000000-0000-0000-0000-000000000002',
        'c0000000-0000-0000-0000-000000000002',
        'repaired',
        'a0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000004',
        'Replaced right caster wheel and lubricated pneumatic gas cylinder at Campus Repair Kiosk.',
        NOW() - INTERVAL '90 days'
    ),
    (
        'd0000000-0000-0000-0000-000000000003',
        'c0000000-0000-0000-0000-000000000002',
        'ownership_transferred',
        'a0000000-0000-0000-0000-000000000002',
        'b0000000-0000-0000-0000-000000000001',
        'Peer handoff completed at Block A Drop-Off Point via verification code.',
        NOW() - INTERVAL '85 days'
    )
ON CONFLICT (id) DO NOTHING;

-- 5. IMPACT LOGS (Provides real initial metrics on /impact dashboard)
INSERT INTO public.impact_logs (id, user_id, item_id, pathway, carbon_saved_kg, waste_diverted_kg, money_saved_inr, created_at)
VALUES
    ('e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'sell', 30.00, 1.50, 450.00, NOW() - INTERVAL '30 days'),
    ('e0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'sell', 40.00, 8.00, 1500.00, NOW() - INTERVAL '85 days'),
    ('e0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000004', 'donate', 1.00, 0.40, 550.00, NOW() - INTERVAL '10 days'),
    ('e0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000009', 'recycle', 12.00, 0.60, 0.00, NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;
