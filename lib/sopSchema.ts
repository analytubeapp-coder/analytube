// lib/sopSchema.ts
import { z } from "zod";

export const ExceptionSchema = z.object({
  condition: z.string(),
  action: z.string(),
});

export const ProcedureStepSchema = z.object({
  step: z.number().int(),
  title: z.string(),
  description: z.string(),
  owner_role: z.string(),
  estimated_time: z.string(),
  checklist: z.array(z.string()).min(1),
  exceptions: z.array(ExceptionSchema).min(1),
});

export const InputOutputSchema = z.object({
  step: z.number().int(),
  title: z.string(),
  inputs: z.array(z.string()),
  outputs: z.array(z.string()),
});

export const RoleSchema = z.object({
  role: z.string(),
  responsibilities: z.array(z.string()).min(1),
  raci: z.enum(["R", "A", "C", "I"]).optional().default("R"),
});

export const KPISchema = z.object({
  name: z.string(),
  definition: z.string(),
  target: z.string(),
  frequency: z.string(),
});

export const ToolSchema = z.object({
  name: z.string(),
  purpose: z.string(),
  integration_hint: z.string(),
});

export const RiskSchema = z.object({
  risk: z.string(),
  impact: z.string(),
  likelihood: z.string(),
  mitigation: z.string(),
});

export const TrainingSchema = z.object({
  role: z.string(),
  training_title: z.string(),
  duration: z.string(),
  resources: z.array(z.string()).min(1),
});

export const RACISchema = z.object({
  activity: z.string(),
  R: z.array(z.string()),
  A: z.array(z.string()),
  C: z.array(z.string()),
  I: z.array(z.string()),
});

export const FlowNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string(),
});

export const FlowEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  label: z.string(),
});

export const DocumentControlSchema = z.object({
  version: z.string(),
  author: z.string(),
  last_reviewed: z.string(),
});

export const SopSchema = z.object({
  meta: z.object({
    title: z.string(),
    company_name: z.string(),
    business_type: z.string(),
    company_size: z.string(),
    company_stage: z.string(),
    industry: z.string(),
    generated_at: z.string(),
  }),
  overview: z.string(),
  objectives: z.array(z.string()).min(1),
  scope: z.string(),
  roles: z.array(RoleSchema).min(1),
  inputs_outputs: z.array(InputOutputSchema).min(1),
  procedure: z.array(ProcedureStepSchema).min(1),
  kpis: z.array(KPISchema).min(1),
  tools: z.array(ToolSchema).min(1),
  risks: z.array(RiskSchema).min(1),
  training: z.array(TrainingSchema).min(1),
  raci_matrix: z.array(RACISchema).min(1),
  flowchart_nodes: z.array(FlowNodeSchema).min(1),
  flowchart_edges: z.array(FlowEdgeSchema).min(1),
  document_control: DocumentControlSchema,
  notes: z.string(),
});

export type SopType = z.infer<typeof SopSchema>;