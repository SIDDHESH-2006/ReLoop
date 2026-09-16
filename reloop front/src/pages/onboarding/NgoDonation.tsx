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

export default function NgoDonation() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted)
    return (
      <ComingSoon message="Your organisation profile has been recorded. Reloop's donation matching and organisation dashboard will be available soon." />
    );

  return (
    <FormShell
      eyebrow="NGO / Donation organisation setup"
      title="NGO / Donation setup"
      subtitle="Tell us what items your organisation accepts and where they can make an impact."
      onSubmit={() => setSubmitted(true)}
    >
      <FormSection index={0} title="Organisation">
        <TextField label="Organisation name" placeholder="Registered name" span required />
        <SelectField
          label="Organisation type"
          options={["NGO", "Charity", "Community Organisation", "Relief Organisation", "Social Enterprise", "Foundation", "Other"]}
        />
      </FormSection>

      <FormSection index={1} title="What you accept">
        <ChipGroup
          label="Donation categories accepted"
          options={["Clothing", "Shoes", "Books", "Educational Material", "Furniture", "Electronics", "Computers / Laptops", "Household Items", "Food", "Toys", "Sports Equipment", "Medical / Assistive Equipment", "Hygiene Products", "Other"]}
        />
        <ChipGroup
          label="Condition accepted"
          options={["New", "Like New", "Used", "Refurbishable", "Any Usable Condition"]}
        />
      </FormSection>

      <FormSection index={2} title="Impact">
        <ChipGroup
          label="Target beneficiaries"
          options={["Students", "Children", "Families", "Elderly", "Low-income Communities", "Disaster Relief", "Shelters", "Schools", "Rural Communities", "Other"]}
        />
        <SelectField
          label="Preferred donation frequency"
          options={["Daily", "Weekly", "Monthly", "As Required"]}
        />
      </FormSection>

      <FormSection index={3} title="Logistics & contact">
        <YesNo label="Pickup availability?" />
        <TextField label="Pickup location" placeholder="Building, gate or landmark" />
        <TextField label="Service area" placeholder="City / region" />
        <TextField label="Contact person" placeholder="Full name" />
        <TextField label="Phone / Email" placeholder="Best way to reach you" />
        <TextArea label="Additional notes" placeholder="Anything else we should know?" />
      </FormSection>
    </FormShell>
  );
}
