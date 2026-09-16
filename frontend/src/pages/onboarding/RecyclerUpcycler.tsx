import { useState } from "react";
import {
  FormShell,
  FormSection,
  TextField,
  TextArea,
  SelectField,
  ChipGroup,
  YesNo,
  ComingSoon,
} from "../../components/onboarding/FormKit";

export default function RecyclerUpcycler() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted)
    return (
      <ComingSoon message="Your organisation profile has been recorded. Reloop's partner network and material-matching dashboard will be available soon." />
    );

  return (
    <FormShell
      eyebrow="Recycler / Upcycler setup"
      title="Recycler / Upcycler setup"
      subtitle="Tell us what your organisation can recover, process, refurbish or transform."
      onSubmit={() => setSubmitted(true)}
    >
      <FormSection index={0} title="Organisation">
        <TextField label="Company / Organisation name" placeholder="Registered name" span required />
        <TextField label="Organisation type" placeholder="e.g. MSME, cooperative, startup" />
        <SelectField
          label="Business category"
          options={[
            "General Waste Recycling", "Plastic Recycling", "Paper Recycling", "Cardboard Recycling",
            "Glass Recycling", "Metal Recycling", "Textile Recycling", "E-Waste Recycling",
            "Battery Recycling", "Electronics Refurbishment", "Electronics Upcycling",
            "Furniture Refurbishment", "Furniture Upcycling", "Textile Upcycling", "Packaging Recovery",
            "Organic Waste Processing", "Construction Material Recovery", "Scrap Processing",
            "Multi-Material Recycling", "Other",
          ]}
        />
      </FormSection>

      <FormSection index={1} title="Capabilities">
        <ChipGroup
          label="Services offered"
          options={["Recycling", "Upcycling", "Refurbishment", "Parts Recovery", "Material Recovery", "Product Remanufacturing", "Waste Collection", "Processing", "Other"]}
        />
        <ChipGroup
          label="Materials accepted"
          options={["Plastic", "Paper", "Cardboard", "Glass", "Metal", "Textiles", "Electronics", "Batteries", "Wood", "Furniture", "Organic Waste", "Mixed Waste", "Other"]}
        />
        <ChipGroup
          label="Processing capabilities"
          options={["Repair", "Refurbish", "Dismantle", "Recover Parts", "Recycle", "Upcycle", "Remanufacture"]}
        />
      </FormSection>

      <FormSection index={2} title="Waste streams">
        <YesNo label="Do you accept electronic waste?">
          <ChipGroup
            label="Electronic items accepted"
            options={["Computers", "Laptops", "Phones", "Chargers", "Cables", "Keyboards", "Mice", "Small Electronics", "Circuit Boards", "Appliances", "Other"]}
          />
        </YesNo>
        <YesNo label="Do you accept general recyclable waste?" />
      </FormSection>

      <FormSection index={3} title="Logistics">
        <SelectField
          label="Processing capacity"
          options={["Less than 50 kg/day", "50–100 kg/day", "100–500 kg/day", "500+ kg/day"]}
        />
        <SelectField label="Pickup / Collection" options={["We collect", "Partner must deliver", "Both"]} />
        <TextField label="Service location" placeholder="City / area" />
        <TextField label="Operating radius" placeholder="e.g. 25 km" />
      </FormSection>

      <FormSection index={4} title="Contact">
        <TextField label="Contact person" placeholder="Full name" />
        <TextField label="Phone / Email" placeholder="Best way to reach you" />
        <TextField label="Website" placeholder="https://" span />
        <TextArea label="Additional notes" placeholder="Anything else we should know?" />
      </FormSection>
    </FormShell>
  );
}
