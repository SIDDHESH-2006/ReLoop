import { useState } from "react";
import {
  FormShell,
  FormSection,
  TextField,
  TextArea,
  SelectField,
  ChipGroup,
  ComingSoon,
} from "../../components/onboarding/FormKit";

export default function FoodInstitution() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted)
    return (
      <ComingSoon message="Your Food Institution profile has been recorded for the next stage of Reloop. Partner onboarding and waste-processing coordination will be available soon." />
    );

  return (
    <FormShell
      eyebrow="Food institution setup"
      title="Food institution setup"
      subtitle="Tell us about your food waste and processing needs."
      onSubmit={() => setSubmitted(true)}
    >
      <FormSection index={0} title="Institution details">
        <TextField label="Institution name" placeholder="e.g. Block C Central Mess" span required />
        <SelectField
          label="Institution type"
          options={["College Mess", "Cafeteria", "Restaurant", "Food Court", "Hostel Mess", "Bakery", "Canteen", "Other"]}
        />
        <SelectField
          label="Daily food waste quantity"
          options={["Less than 10 kg", "10–25 kg", "25–50 kg", "50–100 kg", "100+ kg"]}
        />
      </FormSection>

      <FormSection index={1} title="Waste profile">
        <ChipGroup
          label="Food waste type"
          options={["Cooked Food", "Raw Food", "Vegetable Waste", "Fruit Waste", "Dairy Waste", "Mixed Organic Waste", "Other"]}
        />
        <ChipGroup
          label="Typical waste generation time"
          options={["Morning", "Afternoon", "Evening", "Night", "Multiple Times Per Day"]}
        />
      </FormSection>

      <FormSection index={2} title="Pickup & coordination">
        <SelectField
          label="Preferred pickup frequency"
          options={["Daily", "Alternate Days", "Weekly", "As Required"]}
        />
        <TextField label="Pickup time preference" placeholder="e.g. 9–11 AM" />
        <TextField label="Pickup location" placeholder="Building, gate or landmark" span />
      </FormSection>

      <FormSection index={3} title="Contact">
        <TextField label="Contact person" placeholder="Full name" />
        <TextField label="Phone / Email" placeholder="Best way to reach you" />
        <TextArea label="Additional requirements / notes" placeholder="Anything else we should know?" />
      </FormSection>
    </FormShell>
  );
}
