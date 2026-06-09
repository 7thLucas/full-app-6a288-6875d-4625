/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Tagline",
    },
    {
      fieldName: "providerName",
      type: "string",
      required: false,
      label: "Provider / Brand Name",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary (Background)",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary (Accent)",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent (Gold)",
        },
      ],
    },
    {
      fieldName: "welcomeMessage",
      type: "string",
      required: false,
      label: "Dashboard Welcome Message",
    },
    {
      fieldName: "aiSystemPrompt",
      type: "string",
      required: false,
      label: "AI Strategist System Prompt",
    },
    {
      fieldName: "roadmapPhases",
      type: "array",
      required: false,
      label: "Roadmap Phases",
      item: {
        type: "object",
        fields: [
          { fieldName: "month", type: "string", required: true, label: "Month Label" },
          { fieldName: "title", type: "string", required: true, label: "Phase Title" },
          { fieldName: "description", type: "string", required: false, label: "Phase Description" },
          {
            fieldName: "milestones",
            type: "array",
            required: false,
            label: "Milestones",
            item: { type: "string", required: true },
          },
        ],
      },
    },
    {
      fieldName: "resourceCategories",
      type: "array",
      required: false,
      label: "Resource Categories",
      item: {
        type: "object",
        fields: [
          { fieldName: "title", type: "string", required: true, label: "Title" },
          { fieldName: "description", type: "string", required: false, label: "Description" },
          { fieldName: "icon", type: "string", required: false, label: "Icon Name (lucide)" },
          {
            fieldName: "items",
            type: "array",
            required: false,
            label: "Resource Items",
            item: {
              type: "object",
              fields: [
                { fieldName: "title", type: "string", required: true, label: "Item Title" },
                { fieldName: "description", type: "string", required: false, label: "Item Description" },
                { fieldName: "url", type: "url", required: false, label: "Item URL" },
              ],
            },
          },
        ],
      },
    },
    {
      fieldName: "assessmentQuestions",
      type: "array",
      required: false,
      label: "Career Assessment Questions",
      item: {
        type: "object",
        fields: [
          { fieldName: "id", type: "string", required: true, label: "Question ID" },
          { fieldName: "category", type: "string", required: true, label: "Category" },
          { fieldName: "question", type: "string", required: true, label: "Question Text" },
          {
            fieldName: "type",
            type: "enum",
            required: true,
            label: "Question Type",
            options: ["text", "textarea", "scale", "multiselect"],
          },
          {
            fieldName: "options",
            type: "array",
            required: false,
            label: "Options (for multiselect)",
            item: { type: "string", required: true },
          },
        ],
      },
    },
  ],
};
