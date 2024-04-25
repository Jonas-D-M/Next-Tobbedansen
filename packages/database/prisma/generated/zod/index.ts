import { z } from 'zod';
import type { Prisma } from '../../prisma-client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const EventScalarFieldEnumSchema = z.enum(['id','year','registration_start_date']);

export const ParticipantScalarFieldEnumSchema = z.enum(['id','first_name','last_name','date_of_birth','registration_id']);

export const RegistrantScalarFieldEnumSchema = z.enum(['id','first_name','last_name','email','date_of_birth','place_of_birth']);

export const RegistrationScalarFieldEnumSchema = z.enum(['id','music_request','registrant_id','vessel_id','assosciation','eventId']);

export const VesselTypeScalarFieldEnumSchema = z.enum(['id','max_registrants','type']);

export const VesselScalarFieldEnumSchema = z.enum(['id','name','vessel_type_id']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  id: z.string().uuid(),
  year: z.number().int(),
  registration_start_date: z.coerce.date(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// PARTICIPANT SCHEMA
/////////////////////////////////////////

export const ParticipantSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date(),
  registration_id: z.string(),
})

export type Participant = z.infer<typeof ParticipantSchema>

/////////////////////////////////////////
// REGISTRANT SCHEMA
/////////////////////////////////////////

export const RegistrantSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  date_of_birth: z.coerce.date(),
  place_of_birth: z.string(),
})

export type Registrant = z.infer<typeof RegistrantSchema>

/////////////////////////////////////////
// REGISTRATION SCHEMA
/////////////////////////////////////////

export const RegistrationSchema = z.object({
  id: z.string().uuid(),
  music_request: z.string().nullable(),
  registrant_id: z.string(),
  vessel_id: z.string(),
  assosciation: z.string().nullable(),
  eventId: z.string(),
})

export type Registration = z.infer<typeof RegistrationSchema>

/////////////////////////////////////////
// VESSEL TYPE SCHEMA
/////////////////////////////////////////

export const VesselTypeSchema = z.object({
  id: z.string().uuid(),
  max_registrants: z.number().int(),
  type: z.string(),
})

export type VesselType = z.infer<typeof VesselTypeSchema>

/////////////////////////////////////////
// VESSEL SCHEMA
/////////////////////////////////////////

export const VesselSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  vessel_type_id: z.string(),
})

export type Vessel = z.infer<typeof VesselSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// EVENT
//------------------------------------------------------

export const EventIncludeSchema: z.ZodType<Prisma.EventInclude> = z.object({
  vessel_types: z.union([z.boolean(),z.lazy(() => VesselTypeFindManyArgsSchema)]).optional(),
  registrations: z.union([z.boolean(),z.lazy(() => RegistrationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EventArgsSchema: z.ZodType<Prisma.EventDefaultArgs> = z.object({
  select: z.lazy(() => EventSelectSchema).optional(),
  include: z.lazy(() => EventIncludeSchema).optional(),
}).strict();

export const EventCountOutputTypeArgsSchema: z.ZodType<Prisma.EventCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EventCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EventCountOutputTypeSelectSchema: z.ZodType<Prisma.EventCountOutputTypeSelect> = z.object({
  vessel_types: z.boolean().optional(),
  registrations: z.boolean().optional(),
}).strict();

export const EventSelectSchema: z.ZodType<Prisma.EventSelect> = z.object({
  id: z.boolean().optional(),
  year: z.boolean().optional(),
  registration_start_date: z.boolean().optional(),
  vessel_types: z.union([z.boolean(),z.lazy(() => VesselTypeFindManyArgsSchema)]).optional(),
  registrations: z.union([z.boolean(),z.lazy(() => RegistrationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PARTICIPANT
//------------------------------------------------------

export const ParticipantIncludeSchema: z.ZodType<Prisma.ParticipantInclude> = z.object({
  registration: z.union([z.boolean(),z.lazy(() => RegistrationArgsSchema)]).optional(),
}).strict()

export const ParticipantArgsSchema: z.ZodType<Prisma.ParticipantDefaultArgs> = z.object({
  select: z.lazy(() => ParticipantSelectSchema).optional(),
  include: z.lazy(() => ParticipantIncludeSchema).optional(),
}).strict();

export const ParticipantSelectSchema: z.ZodType<Prisma.ParticipantSelect> = z.object({
  id: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  date_of_birth: z.boolean().optional(),
  registration_id: z.boolean().optional(),
  registration: z.union([z.boolean(),z.lazy(() => RegistrationArgsSchema)]).optional(),
}).strict()

// REGISTRANT
//------------------------------------------------------

export const RegistrantIncludeSchema: z.ZodType<Prisma.RegistrantInclude> = z.object({
  registration: z.union([z.boolean(),z.lazy(() => RegistrationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RegistrantCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RegistrantArgsSchema: z.ZodType<Prisma.RegistrantDefaultArgs> = z.object({
  select: z.lazy(() => RegistrantSelectSchema).optional(),
  include: z.lazy(() => RegistrantIncludeSchema).optional(),
}).strict();

export const RegistrantCountOutputTypeArgsSchema: z.ZodType<Prisma.RegistrantCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RegistrantCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RegistrantCountOutputTypeSelectSchema: z.ZodType<Prisma.RegistrantCountOutputTypeSelect> = z.object({
  registration: z.boolean().optional(),
}).strict();

export const RegistrantSelectSchema: z.ZodType<Prisma.RegistrantSelect> = z.object({
  id: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  email: z.boolean().optional(),
  date_of_birth: z.boolean().optional(),
  place_of_birth: z.boolean().optional(),
  registration: z.union([z.boolean(),z.lazy(() => RegistrationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RegistrantCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REGISTRATION
//------------------------------------------------------

export const RegistrationIncludeSchema: z.ZodType<Prisma.RegistrationInclude> = z.object({
  registrant: z.union([z.boolean(),z.lazy(() => RegistrantArgsSchema)]).optional(),
  participants: z.union([z.boolean(),z.lazy(() => ParticipantFindManyArgsSchema)]).optional(),
  vessel: z.union([z.boolean(),z.lazy(() => VesselArgsSchema)]).optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RegistrationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RegistrationArgsSchema: z.ZodType<Prisma.RegistrationDefaultArgs> = z.object({
  select: z.lazy(() => RegistrationSelectSchema).optional(),
  include: z.lazy(() => RegistrationIncludeSchema).optional(),
}).strict();

export const RegistrationCountOutputTypeArgsSchema: z.ZodType<Prisma.RegistrationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RegistrationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RegistrationCountOutputTypeSelectSchema: z.ZodType<Prisma.RegistrationCountOutputTypeSelect> = z.object({
  participants: z.boolean().optional(),
}).strict();

export const RegistrationSelectSchema: z.ZodType<Prisma.RegistrationSelect> = z.object({
  id: z.boolean().optional(),
  music_request: z.boolean().optional(),
  registrant_id: z.boolean().optional(),
  vessel_id: z.boolean().optional(),
  assosciation: z.boolean().optional(),
  eventId: z.boolean().optional(),
  registrant: z.union([z.boolean(),z.lazy(() => RegistrantArgsSchema)]).optional(),
  participants: z.union([z.boolean(),z.lazy(() => ParticipantFindManyArgsSchema)]).optional(),
  vessel: z.union([z.boolean(),z.lazy(() => VesselArgsSchema)]).optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RegistrationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VESSEL TYPE
//------------------------------------------------------

export const VesselTypeIncludeSchema: z.ZodType<Prisma.VesselTypeInclude> = z.object({
  vessels: z.union([z.boolean(),z.lazy(() => VesselFindManyArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VesselTypeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const VesselTypeArgsSchema: z.ZodType<Prisma.VesselTypeDefaultArgs> = z.object({
  select: z.lazy(() => VesselTypeSelectSchema).optional(),
  include: z.lazy(() => VesselTypeIncludeSchema).optional(),
}).strict();

export const VesselTypeCountOutputTypeArgsSchema: z.ZodType<Prisma.VesselTypeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => VesselTypeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const VesselTypeCountOutputTypeSelectSchema: z.ZodType<Prisma.VesselTypeCountOutputTypeSelect> = z.object({
  vessels: z.boolean().optional(),
  events: z.boolean().optional(),
}).strict();

export const VesselTypeSelectSchema: z.ZodType<Prisma.VesselTypeSelect> = z.object({
  id: z.boolean().optional(),
  max_registrants: z.boolean().optional(),
  type: z.boolean().optional(),
  vessels: z.union([z.boolean(),z.lazy(() => VesselFindManyArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VesselTypeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VESSEL
//------------------------------------------------------

export const VesselIncludeSchema: z.ZodType<Prisma.VesselInclude> = z.object({
  type: z.union([z.boolean(),z.lazy(() => VesselTypeArgsSchema)]).optional(),
  registration: z.union([z.boolean(),z.lazy(() => RegistrationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VesselCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const VesselArgsSchema: z.ZodType<Prisma.VesselDefaultArgs> = z.object({
  select: z.lazy(() => VesselSelectSchema).optional(),
  include: z.lazy(() => VesselIncludeSchema).optional(),
}).strict();

export const VesselCountOutputTypeArgsSchema: z.ZodType<Prisma.VesselCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => VesselCountOutputTypeSelectSchema).nullish(),
}).strict();

export const VesselCountOutputTypeSelectSchema: z.ZodType<Prisma.VesselCountOutputTypeSelect> = z.object({
  registration: z.boolean().optional(),
}).strict();

export const VesselSelectSchema: z.ZodType<Prisma.VesselSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  vessel_type_id: z.boolean().optional(),
  type: z.union([z.boolean(),z.lazy(() => VesselTypeArgsSchema)]).optional(),
  registration: z.union([z.boolean(),z.lazy(() => RegistrationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VesselCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const EventWhereInputSchema: z.ZodType<Prisma.EventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  registration_start_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  vessel_types: z.lazy(() => VesselTypeListRelationFilterSchema).optional(),
  registrations: z.lazy(() => RegistrationListRelationFilterSchema).optional()
}).strict();

export const EventOrderByWithRelationInputSchema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  registration_start_date: z.lazy(() => SortOrderSchema).optional(),
  vessel_types: z.lazy(() => VesselTypeOrderByRelationAggregateInputSchema).optional(),
  registrations: z.lazy(() => RegistrationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const EventWhereUniqueInputSchema: z.ZodType<Prisma.EventWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  registration_start_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  vessel_types: z.lazy(() => VesselTypeListRelationFilterSchema).optional(),
  registrations: z.lazy(() => RegistrationListRelationFilterSchema).optional()
}).strict());

export const EventOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  registration_start_date: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EventAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EventSumOrderByAggregateInputSchema).optional()
}).strict();

export const EventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  year: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  registration_start_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ParticipantWhereInputSchema: z.ZodType<Prisma.ParticipantWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ParticipantWhereInputSchema),z.lazy(() => ParticipantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ParticipantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ParticipantWhereInputSchema),z.lazy(() => ParticipantWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date_of_birth: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  registration_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  registration: z.union([ z.lazy(() => RegistrationRelationFilterSchema),z.lazy(() => RegistrationWhereInputSchema) ]).optional(),
}).strict();

export const ParticipantOrderByWithRelationInputSchema: z.ZodType<Prisma.ParticipantOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  registration_id: z.lazy(() => SortOrderSchema).optional(),
  registration: z.lazy(() => RegistrationOrderByWithRelationInputSchema).optional()
}).strict();

export const ParticipantWhereUniqueInputSchema: z.ZodType<Prisma.ParticipantWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ParticipantWhereInputSchema),z.lazy(() => ParticipantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ParticipantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ParticipantWhereInputSchema),z.lazy(() => ParticipantWhereInputSchema).array() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date_of_birth: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  registration_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  registration: z.union([ z.lazy(() => RegistrationRelationFilterSchema),z.lazy(() => RegistrationWhereInputSchema) ]).optional(),
}).strict());

export const ParticipantOrderByWithAggregationInputSchema: z.ZodType<Prisma.ParticipantOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  registration_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ParticipantCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ParticipantMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ParticipantMinOrderByAggregateInputSchema).optional()
}).strict();

export const ParticipantScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ParticipantScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ParticipantScalarWhereWithAggregatesInputSchema),z.lazy(() => ParticipantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ParticipantScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ParticipantScalarWhereWithAggregatesInputSchema),z.lazy(() => ParticipantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date_of_birth: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  registration_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RegistrantWhereInputSchema: z.ZodType<Prisma.RegistrantWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RegistrantWhereInputSchema),z.lazy(() => RegistrantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegistrantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegistrantWhereInputSchema),z.lazy(() => RegistrantWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date_of_birth: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  place_of_birth: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  registration: z.lazy(() => RegistrationListRelationFilterSchema).optional()
}).strict();

export const RegistrantOrderByWithRelationInputSchema: z.ZodType<Prisma.RegistrantOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  place_of_birth: z.lazy(() => SortOrderSchema).optional(),
  registration: z.lazy(() => RegistrationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RegistrantWhereUniqueInputSchema: z.ZodType<Prisma.RegistrantWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => RegistrantWhereInputSchema),z.lazy(() => RegistrantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegistrantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegistrantWhereInputSchema),z.lazy(() => RegistrantWhereInputSchema).array() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date_of_birth: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  place_of_birth: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  registration: z.lazy(() => RegistrationListRelationFilterSchema).optional()
}).strict());

export const RegistrantOrderByWithAggregationInputSchema: z.ZodType<Prisma.RegistrantOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  place_of_birth: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RegistrantCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RegistrantMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RegistrantMinOrderByAggregateInputSchema).optional()
}).strict();

export const RegistrantScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RegistrantScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RegistrantScalarWhereWithAggregatesInputSchema),z.lazy(() => RegistrantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegistrantScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegistrantScalarWhereWithAggregatesInputSchema),z.lazy(() => RegistrantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date_of_birth: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  place_of_birth: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RegistrationWhereInputSchema: z.ZodType<Prisma.RegistrationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RegistrationWhereInputSchema),z.lazy(() => RegistrationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegistrationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegistrationWhereInputSchema),z.lazy(() => RegistrationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_request: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  registrant_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vessel_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assosciation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  registrant: z.union([ z.lazy(() => RegistrantRelationFilterSchema),z.lazy(() => RegistrantWhereInputSchema) ]).optional(),
  participants: z.lazy(() => ParticipantListRelationFilterSchema).optional(),
  vessel: z.union([ z.lazy(() => VesselRelationFilterSchema),z.lazy(() => VesselWhereInputSchema) ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
}).strict();

export const RegistrationOrderByWithRelationInputSchema: z.ZodType<Prisma.RegistrationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  music_request: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  registrant_id: z.lazy(() => SortOrderSchema).optional(),
  vessel_id: z.lazy(() => SortOrderSchema).optional(),
  assosciation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  registrant: z.lazy(() => RegistrantOrderByWithRelationInputSchema).optional(),
  participants: z.lazy(() => ParticipantOrderByRelationAggregateInputSchema).optional(),
  vessel: z.lazy(() => VesselOrderByWithRelationInputSchema).optional(),
  event: z.lazy(() => EventOrderByWithRelationInputSchema).optional()
}).strict();

export const RegistrationWhereUniqueInputSchema: z.ZodType<Prisma.RegistrationWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => RegistrationWhereInputSchema),z.lazy(() => RegistrationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegistrationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegistrationWhereInputSchema),z.lazy(() => RegistrationWhereInputSchema).array() ]).optional(),
  music_request: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  registrant_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vessel_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assosciation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  registrant: z.union([ z.lazy(() => RegistrantRelationFilterSchema),z.lazy(() => RegistrantWhereInputSchema) ]).optional(),
  participants: z.lazy(() => ParticipantListRelationFilterSchema).optional(),
  vessel: z.union([ z.lazy(() => VesselRelationFilterSchema),z.lazy(() => VesselWhereInputSchema) ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
}).strict());

export const RegistrationOrderByWithAggregationInputSchema: z.ZodType<Prisma.RegistrationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  music_request: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  registrant_id: z.lazy(() => SortOrderSchema).optional(),
  vessel_id: z.lazy(() => SortOrderSchema).optional(),
  assosciation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RegistrationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RegistrationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RegistrationMinOrderByAggregateInputSchema).optional()
}).strict();

export const RegistrationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RegistrationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RegistrationScalarWhereWithAggregatesInputSchema),z.lazy(() => RegistrationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegistrationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegistrationScalarWhereWithAggregatesInputSchema),z.lazy(() => RegistrationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  music_request: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  registrant_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  vessel_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  assosciation: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  eventId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const VesselTypeWhereInputSchema: z.ZodType<Prisma.VesselTypeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VesselTypeWhereInputSchema),z.lazy(() => VesselTypeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VesselTypeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VesselTypeWhereInputSchema),z.lazy(() => VesselTypeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  max_registrants: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vessels: z.lazy(() => VesselListRelationFilterSchema).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict();

export const VesselTypeOrderByWithRelationInputSchema: z.ZodType<Prisma.VesselTypeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  max_registrants: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  vessels: z.lazy(() => VesselOrderByRelationAggregateInputSchema).optional(),
  events: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional()
}).strict();

export const VesselTypeWhereUniqueInputSchema: z.ZodType<Prisma.VesselTypeWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => VesselTypeWhereInputSchema),z.lazy(() => VesselTypeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VesselTypeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VesselTypeWhereInputSchema),z.lazy(() => VesselTypeWhereInputSchema).array() ]).optional(),
  max_registrants: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vessels: z.lazy(() => VesselListRelationFilterSchema).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict());

export const VesselTypeOrderByWithAggregationInputSchema: z.ZodType<Prisma.VesselTypeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  max_registrants: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VesselTypeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => VesselTypeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VesselTypeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VesselTypeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => VesselTypeSumOrderByAggregateInputSchema).optional()
}).strict();

export const VesselTypeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VesselTypeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VesselTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => VesselTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VesselTypeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VesselTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => VesselTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  max_registrants: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const VesselWhereInputSchema: z.ZodType<Prisma.VesselWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VesselWhereInputSchema),z.lazy(() => VesselWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VesselWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VesselWhereInputSchema),z.lazy(() => VesselWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vessel_type_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => VesselTypeRelationFilterSchema),z.lazy(() => VesselTypeWhereInputSchema) ]).optional(),
  registration: z.lazy(() => RegistrationListRelationFilterSchema).optional()
}).strict();

export const VesselOrderByWithRelationInputSchema: z.ZodType<Prisma.VesselOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  vessel_type_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => VesselTypeOrderByWithRelationInputSchema).optional(),
  registration: z.lazy(() => RegistrationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const VesselWhereUniqueInputSchema: z.ZodType<Prisma.VesselWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => VesselWhereInputSchema),z.lazy(() => VesselWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VesselWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VesselWhereInputSchema),z.lazy(() => VesselWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vessel_type_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => VesselTypeRelationFilterSchema),z.lazy(() => VesselTypeWhereInputSchema) ]).optional(),
  registration: z.lazy(() => RegistrationListRelationFilterSchema).optional()
}).strict());

export const VesselOrderByWithAggregationInputSchema: z.ZodType<Prisma.VesselOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  vessel_type_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VesselCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VesselMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VesselMinOrderByAggregateInputSchema).optional()
}).strict();

export const VesselScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VesselScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VesselScalarWhereWithAggregatesInputSchema),z.lazy(() => VesselScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VesselScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VesselScalarWhereWithAggregatesInputSchema),z.lazy(() => VesselScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  vessel_type_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const EventCreateInputSchema: z.ZodType<Prisma.EventCreateInput> = z.object({
  id: z.string().uuid().optional(),
  year: z.number().int(),
  registration_start_date: z.coerce.date(),
  vessel_types: z.lazy(() => VesselTypeCreateNestedManyWithoutEventsInputSchema).optional(),
  registrations: z.lazy(() => RegistrationCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateInputSchema: z.ZodType<Prisma.EventUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  year: z.number().int(),
  registration_start_date: z.coerce.date(),
  vessel_types: z.lazy(() => VesselTypeUncheckedCreateNestedManyWithoutEventsInputSchema).optional(),
  registrations: z.lazy(() => RegistrationUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUpdateInputSchema: z.ZodType<Prisma.EventUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  registration_start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_types: z.lazy(() => VesselTypeUpdateManyWithoutEventsNestedInputSchema).optional(),
  registrations: z.lazy(() => RegistrationUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateInputSchema: z.ZodType<Prisma.EventUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  registration_start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_types: z.lazy(() => VesselTypeUncheckedUpdateManyWithoutEventsNestedInputSchema).optional(),
  registrations: z.lazy(() => RegistrationUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventCreateManyInputSchema: z.ZodType<Prisma.EventCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  year: z.number().int(),
  registration_start_date: z.coerce.date()
}).strict();

export const EventUpdateManyMutationInputSchema: z.ZodType<Prisma.EventUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  registration_start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  registration_start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ParticipantCreateInputSchema: z.ZodType<Prisma.ParticipantCreateInput> = z.object({
  id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date(),
  registration: z.lazy(() => RegistrationCreateNestedOneWithoutParticipantsInputSchema)
}).strict();

export const ParticipantUncheckedCreateInputSchema: z.ZodType<Prisma.ParticipantUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date(),
  registration_id: z.string()
}).strict();

export const ParticipantUpdateInputSchema: z.ZodType<Prisma.ParticipantUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  registration: z.lazy(() => RegistrationUpdateOneRequiredWithoutParticipantsNestedInputSchema).optional()
}).strict();

export const ParticipantUncheckedUpdateInputSchema: z.ZodType<Prisma.ParticipantUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  registration_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ParticipantCreateManyInputSchema: z.ZodType<Prisma.ParticipantCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date(),
  registration_id: z.string()
}).strict();

export const ParticipantUpdateManyMutationInputSchema: z.ZodType<Prisma.ParticipantUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ParticipantUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ParticipantUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  registration_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RegistrantCreateInputSchema: z.ZodType<Prisma.RegistrantCreateInput> = z.object({
  id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  date_of_birth: z.coerce.date(),
  place_of_birth: z.string(),
  registration: z.lazy(() => RegistrationCreateNestedManyWithoutRegistrantInputSchema).optional()
}).strict();

export const RegistrantUncheckedCreateInputSchema: z.ZodType<Prisma.RegistrantUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  date_of_birth: z.coerce.date(),
  place_of_birth: z.string(),
  registration: z.lazy(() => RegistrationUncheckedCreateNestedManyWithoutRegistrantInputSchema).optional()
}).strict();

export const RegistrantUpdateInputSchema: z.ZodType<Prisma.RegistrantUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  place_of_birth: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  registration: z.lazy(() => RegistrationUpdateManyWithoutRegistrantNestedInputSchema).optional()
}).strict();

export const RegistrantUncheckedUpdateInputSchema: z.ZodType<Prisma.RegistrantUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  place_of_birth: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  registration: z.lazy(() => RegistrationUncheckedUpdateManyWithoutRegistrantNestedInputSchema).optional()
}).strict();

export const RegistrantCreateManyInputSchema: z.ZodType<Prisma.RegistrantCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  date_of_birth: z.coerce.date(),
  place_of_birth: z.string()
}).strict();

export const RegistrantUpdateManyMutationInputSchema: z.ZodType<Prisma.RegistrantUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  place_of_birth: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RegistrantUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RegistrantUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  place_of_birth: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RegistrationCreateInputSchema: z.ZodType<Prisma.RegistrationCreateInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  assosciation: z.string().optional().nullable(),
  registrant: z.lazy(() => RegistrantCreateNestedOneWithoutRegistrationInputSchema),
  participants: z.lazy(() => ParticipantCreateNestedManyWithoutRegistrationInputSchema).optional(),
  vessel: z.lazy(() => VesselCreateNestedOneWithoutRegistrationInputSchema),
  event: z.lazy(() => EventCreateNestedOneWithoutRegistrationsInputSchema)
}).strict();

export const RegistrationUncheckedCreateInputSchema: z.ZodType<Prisma.RegistrationUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  registrant_id: z.string(),
  vessel_id: z.string(),
  assosciation: z.string().optional().nullable(),
  eventId: z.string(),
  participants: z.lazy(() => ParticipantUncheckedCreateNestedManyWithoutRegistrationInputSchema).optional()
}).strict();

export const RegistrationUpdateInputSchema: z.ZodType<Prisma.RegistrationUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrant: z.lazy(() => RegistrantUpdateOneRequiredWithoutRegistrationNestedInputSchema).optional(),
  participants: z.lazy(() => ParticipantUpdateManyWithoutRegistrationNestedInputSchema).optional(),
  vessel: z.lazy(() => VesselUpdateOneRequiredWithoutRegistrationNestedInputSchema).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutRegistrationsNestedInputSchema).optional()
}).strict();

export const RegistrationUncheckedUpdateInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  participants: z.lazy(() => ParticipantUncheckedUpdateManyWithoutRegistrationNestedInputSchema).optional()
}).strict();

export const RegistrationCreateManyInputSchema: z.ZodType<Prisma.RegistrationCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  registrant_id: z.string(),
  vessel_id: z.string(),
  assosciation: z.string().optional().nullable(),
  eventId: z.string()
}).strict();

export const RegistrationUpdateManyMutationInputSchema: z.ZodType<Prisma.RegistrationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RegistrationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VesselTypeCreateInputSchema: z.ZodType<Prisma.VesselTypeCreateInput> = z.object({
  id: z.string().uuid().optional(),
  max_registrants: z.number().int().optional(),
  type: z.string(),
  vessels: z.lazy(() => VesselCreateNestedManyWithoutTypeInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutVessel_typesInputSchema).optional()
}).strict();

export const VesselTypeUncheckedCreateInputSchema: z.ZodType<Prisma.VesselTypeUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  max_registrants: z.number().int().optional(),
  type: z.string(),
  vessels: z.lazy(() => VesselUncheckedCreateNestedManyWithoutTypeInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutVessel_typesInputSchema).optional()
}).strict();

export const VesselTypeUpdateInputSchema: z.ZodType<Prisma.VesselTypeUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_registrants: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessels: z.lazy(() => VesselUpdateManyWithoutTypeNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutVessel_typesNestedInputSchema).optional()
}).strict();

export const VesselTypeUncheckedUpdateInputSchema: z.ZodType<Prisma.VesselTypeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_registrants: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessels: z.lazy(() => VesselUncheckedUpdateManyWithoutTypeNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutVessel_typesNestedInputSchema).optional()
}).strict();

export const VesselTypeCreateManyInputSchema: z.ZodType<Prisma.VesselTypeCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  max_registrants: z.number().int().optional(),
  type: z.string()
}).strict();

export const VesselTypeUpdateManyMutationInputSchema: z.ZodType<Prisma.VesselTypeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_registrants: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VesselTypeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VesselTypeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_registrants: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VesselCreateInputSchema: z.ZodType<Prisma.VesselCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.lazy(() => VesselTypeCreateNestedOneWithoutVesselsInputSchema),
  registration: z.lazy(() => RegistrationCreateNestedManyWithoutVesselInputSchema).optional()
}).strict();

export const VesselUncheckedCreateInputSchema: z.ZodType<Prisma.VesselUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  vessel_type_id: z.string(),
  registration: z.lazy(() => RegistrationUncheckedCreateNestedManyWithoutVesselInputSchema).optional()
}).strict();

export const VesselUpdateInputSchema: z.ZodType<Prisma.VesselUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.lazy(() => VesselTypeUpdateOneRequiredWithoutVesselsNestedInputSchema).optional(),
  registration: z.lazy(() => RegistrationUpdateManyWithoutVesselNestedInputSchema).optional()
}).strict();

export const VesselUncheckedUpdateInputSchema: z.ZodType<Prisma.VesselUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_type_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  registration: z.lazy(() => RegistrationUncheckedUpdateManyWithoutVesselNestedInputSchema).optional()
}).strict();

export const VesselCreateManyInputSchema: z.ZodType<Prisma.VesselCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  vessel_type_id: z.string()
}).strict();

export const VesselUpdateManyMutationInputSchema: z.ZodType<Prisma.VesselUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VesselUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VesselUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_type_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const VesselTypeListRelationFilterSchema: z.ZodType<Prisma.VesselTypeListRelationFilter> = z.object({
  every: z.lazy(() => VesselTypeWhereInputSchema).optional(),
  some: z.lazy(() => VesselTypeWhereInputSchema).optional(),
  none: z.lazy(() => VesselTypeWhereInputSchema).optional()
}).strict();

export const RegistrationListRelationFilterSchema: z.ZodType<Prisma.RegistrationListRelationFilter> = z.object({
  every: z.lazy(() => RegistrationWhereInputSchema).optional(),
  some: z.lazy(() => RegistrationWhereInputSchema).optional(),
  none: z.lazy(() => RegistrationWhereInputSchema).optional()
}).strict();

export const VesselTypeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VesselTypeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegistrationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RegistrationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  registration_start_date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EventAvgOrderByAggregateInput> = z.object({
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  registration_start_date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  registration_start_date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventSumOrderByAggregateInputSchema: z.ZodType<Prisma.EventSumOrderByAggregateInput> = z.object({
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const RegistrationRelationFilterSchema: z.ZodType<Prisma.RegistrationRelationFilter> = z.object({
  is: z.lazy(() => RegistrationWhereInputSchema).optional(),
  isNot: z.lazy(() => RegistrationWhereInputSchema).optional()
}).strict();

export const ParticipantCountOrderByAggregateInputSchema: z.ZodType<Prisma.ParticipantCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  registration_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ParticipantMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ParticipantMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  registration_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ParticipantMinOrderByAggregateInputSchema: z.ZodType<Prisma.ParticipantMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  registration_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegistrantCountOrderByAggregateInputSchema: z.ZodType<Prisma.RegistrantCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  place_of_birth: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegistrantMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RegistrantMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  place_of_birth: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegistrantMinOrderByAggregateInputSchema: z.ZodType<Prisma.RegistrantMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  place_of_birth: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const RegistrantRelationFilterSchema: z.ZodType<Prisma.RegistrantRelationFilter> = z.object({
  is: z.lazy(() => RegistrantWhereInputSchema).optional(),
  isNot: z.lazy(() => RegistrantWhereInputSchema).optional()
}).strict();

export const ParticipantListRelationFilterSchema: z.ZodType<Prisma.ParticipantListRelationFilter> = z.object({
  every: z.lazy(() => ParticipantWhereInputSchema).optional(),
  some: z.lazy(() => ParticipantWhereInputSchema).optional(),
  none: z.lazy(() => ParticipantWhereInputSchema).optional()
}).strict();

export const VesselRelationFilterSchema: z.ZodType<Prisma.VesselRelationFilter> = z.object({
  is: z.lazy(() => VesselWhereInputSchema).optional(),
  isNot: z.lazy(() => VesselWhereInputSchema).optional()
}).strict();

export const EventRelationFilterSchema: z.ZodType<Prisma.EventRelationFilter> = z.object({
  is: z.lazy(() => EventWhereInputSchema).optional(),
  isNot: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ParticipantOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ParticipantOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegistrationCountOrderByAggregateInputSchema: z.ZodType<Prisma.RegistrationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  music_request: z.lazy(() => SortOrderSchema).optional(),
  registrant_id: z.lazy(() => SortOrderSchema).optional(),
  vessel_id: z.lazy(() => SortOrderSchema).optional(),
  assosciation: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegistrationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RegistrationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  music_request: z.lazy(() => SortOrderSchema).optional(),
  registrant_id: z.lazy(() => SortOrderSchema).optional(),
  vessel_id: z.lazy(() => SortOrderSchema).optional(),
  assosciation: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegistrationMinOrderByAggregateInputSchema: z.ZodType<Prisma.RegistrationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  music_request: z.lazy(() => SortOrderSchema).optional(),
  registrant_id: z.lazy(() => SortOrderSchema).optional(),
  vessel_id: z.lazy(() => SortOrderSchema).optional(),
  assosciation: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const VesselListRelationFilterSchema: z.ZodType<Prisma.VesselListRelationFilter> = z.object({
  every: z.lazy(() => VesselWhereInputSchema).optional(),
  some: z.lazy(() => VesselWhereInputSchema).optional(),
  none: z.lazy(() => VesselWhereInputSchema).optional()
}).strict();

export const EventListRelationFilterSchema: z.ZodType<Prisma.EventListRelationFilter> = z.object({
  every: z.lazy(() => EventWhereInputSchema).optional(),
  some: z.lazy(() => EventWhereInputSchema).optional(),
  none: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const VesselOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VesselOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VesselTypeCountOrderByAggregateInputSchema: z.ZodType<Prisma.VesselTypeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  max_registrants: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VesselTypeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VesselTypeAvgOrderByAggregateInput> = z.object({
  max_registrants: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VesselTypeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VesselTypeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  max_registrants: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VesselTypeMinOrderByAggregateInputSchema: z.ZodType<Prisma.VesselTypeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  max_registrants: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VesselTypeSumOrderByAggregateInputSchema: z.ZodType<Prisma.VesselTypeSumOrderByAggregateInput> = z.object({
  max_registrants: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VesselTypeRelationFilterSchema: z.ZodType<Prisma.VesselTypeRelationFilter> = z.object({
  is: z.lazy(() => VesselTypeWhereInputSchema).optional(),
  isNot: z.lazy(() => VesselTypeWhereInputSchema).optional()
}).strict();

export const VesselCountOrderByAggregateInputSchema: z.ZodType<Prisma.VesselCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  vessel_type_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VesselMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VesselMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  vessel_type_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VesselMinOrderByAggregateInputSchema: z.ZodType<Prisma.VesselMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  vessel_type_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VesselTypeCreateNestedManyWithoutEventsInputSchema: z.ZodType<Prisma.VesselTypeCreateNestedManyWithoutEventsInput> = z.object({
  create: z.union([ z.lazy(() => VesselTypeCreateWithoutEventsInputSchema),z.lazy(() => VesselTypeCreateWithoutEventsInputSchema).array(),z.lazy(() => VesselTypeUncheckedCreateWithoutEventsInputSchema),z.lazy(() => VesselTypeUncheckedCreateWithoutEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VesselTypeCreateOrConnectWithoutEventsInputSchema),z.lazy(() => VesselTypeCreateOrConnectWithoutEventsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VesselTypeWhereUniqueInputSchema),z.lazy(() => VesselTypeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RegistrationCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.RegistrationCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutEventInputSchema),z.lazy(() => RegistrationCreateWithoutEventInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutEventInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutEventInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VesselTypeUncheckedCreateNestedManyWithoutEventsInputSchema: z.ZodType<Prisma.VesselTypeUncheckedCreateNestedManyWithoutEventsInput> = z.object({
  create: z.union([ z.lazy(() => VesselTypeCreateWithoutEventsInputSchema),z.lazy(() => VesselTypeCreateWithoutEventsInputSchema).array(),z.lazy(() => VesselTypeUncheckedCreateWithoutEventsInputSchema),z.lazy(() => VesselTypeUncheckedCreateWithoutEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VesselTypeCreateOrConnectWithoutEventsInputSchema),z.lazy(() => VesselTypeCreateOrConnectWithoutEventsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VesselTypeWhereUniqueInputSchema),z.lazy(() => VesselTypeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RegistrationUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.RegistrationUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutEventInputSchema),z.lazy(() => RegistrationCreateWithoutEventInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutEventInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutEventInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const VesselTypeUpdateManyWithoutEventsNestedInputSchema: z.ZodType<Prisma.VesselTypeUpdateManyWithoutEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => VesselTypeCreateWithoutEventsInputSchema),z.lazy(() => VesselTypeCreateWithoutEventsInputSchema).array(),z.lazy(() => VesselTypeUncheckedCreateWithoutEventsInputSchema),z.lazy(() => VesselTypeUncheckedCreateWithoutEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VesselTypeCreateOrConnectWithoutEventsInputSchema),z.lazy(() => VesselTypeCreateOrConnectWithoutEventsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VesselTypeUpsertWithWhereUniqueWithoutEventsInputSchema),z.lazy(() => VesselTypeUpsertWithWhereUniqueWithoutEventsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => VesselTypeWhereUniqueInputSchema),z.lazy(() => VesselTypeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VesselTypeWhereUniqueInputSchema),z.lazy(() => VesselTypeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VesselTypeWhereUniqueInputSchema),z.lazy(() => VesselTypeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VesselTypeWhereUniqueInputSchema),z.lazy(() => VesselTypeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VesselTypeUpdateWithWhereUniqueWithoutEventsInputSchema),z.lazy(() => VesselTypeUpdateWithWhereUniqueWithoutEventsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VesselTypeUpdateManyWithWhereWithoutEventsInputSchema),z.lazy(() => VesselTypeUpdateManyWithWhereWithoutEventsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VesselTypeScalarWhereInputSchema),z.lazy(() => VesselTypeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RegistrationUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.RegistrationUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutEventInputSchema),z.lazy(() => RegistrationCreateWithoutEventInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutEventInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutEventInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RegistrationUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => RegistrationUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RegistrationScalarWhereInputSchema),z.lazy(() => RegistrationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VesselTypeUncheckedUpdateManyWithoutEventsNestedInputSchema: z.ZodType<Prisma.VesselTypeUncheckedUpdateManyWithoutEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => VesselTypeCreateWithoutEventsInputSchema),z.lazy(() => VesselTypeCreateWithoutEventsInputSchema).array(),z.lazy(() => VesselTypeUncheckedCreateWithoutEventsInputSchema),z.lazy(() => VesselTypeUncheckedCreateWithoutEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VesselTypeCreateOrConnectWithoutEventsInputSchema),z.lazy(() => VesselTypeCreateOrConnectWithoutEventsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VesselTypeUpsertWithWhereUniqueWithoutEventsInputSchema),z.lazy(() => VesselTypeUpsertWithWhereUniqueWithoutEventsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => VesselTypeWhereUniqueInputSchema),z.lazy(() => VesselTypeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VesselTypeWhereUniqueInputSchema),z.lazy(() => VesselTypeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VesselTypeWhereUniqueInputSchema),z.lazy(() => VesselTypeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VesselTypeWhereUniqueInputSchema),z.lazy(() => VesselTypeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VesselTypeUpdateWithWhereUniqueWithoutEventsInputSchema),z.lazy(() => VesselTypeUpdateWithWhereUniqueWithoutEventsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VesselTypeUpdateManyWithWhereWithoutEventsInputSchema),z.lazy(() => VesselTypeUpdateManyWithWhereWithoutEventsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VesselTypeScalarWhereInputSchema),z.lazy(() => VesselTypeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RegistrationUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutEventInputSchema),z.lazy(() => RegistrationCreateWithoutEventInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutEventInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutEventInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RegistrationUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => RegistrationUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RegistrationScalarWhereInputSchema),z.lazy(() => RegistrationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RegistrationCreateNestedOneWithoutParticipantsInputSchema: z.ZodType<Prisma.RegistrationCreateNestedOneWithoutParticipantsInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutParticipantsInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutParticipantsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RegistrationCreateOrConnectWithoutParticipantsInputSchema).optional(),
  connect: z.lazy(() => RegistrationWhereUniqueInputSchema).optional()
}).strict();

export const RegistrationUpdateOneRequiredWithoutParticipantsNestedInputSchema: z.ZodType<Prisma.RegistrationUpdateOneRequiredWithoutParticipantsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutParticipantsInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutParticipantsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RegistrationCreateOrConnectWithoutParticipantsInputSchema).optional(),
  upsert: z.lazy(() => RegistrationUpsertWithoutParticipantsInputSchema).optional(),
  connect: z.lazy(() => RegistrationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RegistrationUpdateToOneWithWhereWithoutParticipantsInputSchema),z.lazy(() => RegistrationUpdateWithoutParticipantsInputSchema),z.lazy(() => RegistrationUncheckedUpdateWithoutParticipantsInputSchema) ]).optional(),
}).strict();

export const RegistrationCreateNestedManyWithoutRegistrantInputSchema: z.ZodType<Prisma.RegistrationCreateNestedManyWithoutRegistrantInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutRegistrantInputSchema),z.lazy(() => RegistrationCreateWithoutRegistrantInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutRegistrantInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutRegistrantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutRegistrantInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutRegistrantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyRegistrantInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RegistrationUncheckedCreateNestedManyWithoutRegistrantInputSchema: z.ZodType<Prisma.RegistrationUncheckedCreateNestedManyWithoutRegistrantInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutRegistrantInputSchema),z.lazy(() => RegistrationCreateWithoutRegistrantInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutRegistrantInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutRegistrantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutRegistrantInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutRegistrantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyRegistrantInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RegistrationUpdateManyWithoutRegistrantNestedInputSchema: z.ZodType<Prisma.RegistrationUpdateManyWithoutRegistrantNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutRegistrantInputSchema),z.lazy(() => RegistrationCreateWithoutRegistrantInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutRegistrantInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutRegistrantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutRegistrantInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutRegistrantInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutRegistrantInputSchema),z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutRegistrantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyRegistrantInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutRegistrantInputSchema),z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutRegistrantInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RegistrationUpdateManyWithWhereWithoutRegistrantInputSchema),z.lazy(() => RegistrationUpdateManyWithWhereWithoutRegistrantInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RegistrationScalarWhereInputSchema),z.lazy(() => RegistrationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RegistrationUncheckedUpdateManyWithoutRegistrantNestedInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateManyWithoutRegistrantNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutRegistrantInputSchema),z.lazy(() => RegistrationCreateWithoutRegistrantInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutRegistrantInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutRegistrantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutRegistrantInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutRegistrantInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutRegistrantInputSchema),z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutRegistrantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyRegistrantInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutRegistrantInputSchema),z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutRegistrantInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RegistrationUpdateManyWithWhereWithoutRegistrantInputSchema),z.lazy(() => RegistrationUpdateManyWithWhereWithoutRegistrantInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RegistrationScalarWhereInputSchema),z.lazy(() => RegistrationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RegistrantCreateNestedOneWithoutRegistrationInputSchema: z.ZodType<Prisma.RegistrantCreateNestedOneWithoutRegistrationInput> = z.object({
  create: z.union([ z.lazy(() => RegistrantCreateWithoutRegistrationInputSchema),z.lazy(() => RegistrantUncheckedCreateWithoutRegistrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RegistrantCreateOrConnectWithoutRegistrationInputSchema).optional(),
  connect: z.lazy(() => RegistrantWhereUniqueInputSchema).optional()
}).strict();

export const ParticipantCreateNestedManyWithoutRegistrationInputSchema: z.ZodType<Prisma.ParticipantCreateNestedManyWithoutRegistrationInput> = z.object({
  create: z.union([ z.lazy(() => ParticipantCreateWithoutRegistrationInputSchema),z.lazy(() => ParticipantCreateWithoutRegistrationInputSchema).array(),z.lazy(() => ParticipantUncheckedCreateWithoutRegistrationInputSchema),z.lazy(() => ParticipantUncheckedCreateWithoutRegistrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ParticipantCreateOrConnectWithoutRegistrationInputSchema),z.lazy(() => ParticipantCreateOrConnectWithoutRegistrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ParticipantCreateManyRegistrationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ParticipantWhereUniqueInputSchema),z.lazy(() => ParticipantWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VesselCreateNestedOneWithoutRegistrationInputSchema: z.ZodType<Prisma.VesselCreateNestedOneWithoutRegistrationInput> = z.object({
  create: z.union([ z.lazy(() => VesselCreateWithoutRegistrationInputSchema),z.lazy(() => VesselUncheckedCreateWithoutRegistrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VesselCreateOrConnectWithoutRegistrationInputSchema).optional(),
  connect: z.lazy(() => VesselWhereUniqueInputSchema).optional()
}).strict();

export const EventCreateNestedOneWithoutRegistrationsInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutRegistrationsInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutRegistrationsInputSchema),z.lazy(() => EventUncheckedCreateWithoutRegistrationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutRegistrationsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const ParticipantUncheckedCreateNestedManyWithoutRegistrationInputSchema: z.ZodType<Prisma.ParticipantUncheckedCreateNestedManyWithoutRegistrationInput> = z.object({
  create: z.union([ z.lazy(() => ParticipantCreateWithoutRegistrationInputSchema),z.lazy(() => ParticipantCreateWithoutRegistrationInputSchema).array(),z.lazy(() => ParticipantUncheckedCreateWithoutRegistrationInputSchema),z.lazy(() => ParticipantUncheckedCreateWithoutRegistrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ParticipantCreateOrConnectWithoutRegistrationInputSchema),z.lazy(() => ParticipantCreateOrConnectWithoutRegistrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ParticipantCreateManyRegistrationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ParticipantWhereUniqueInputSchema),z.lazy(() => ParticipantWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const RegistrantUpdateOneRequiredWithoutRegistrationNestedInputSchema: z.ZodType<Prisma.RegistrantUpdateOneRequiredWithoutRegistrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegistrantCreateWithoutRegistrationInputSchema),z.lazy(() => RegistrantUncheckedCreateWithoutRegistrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RegistrantCreateOrConnectWithoutRegistrationInputSchema).optional(),
  upsert: z.lazy(() => RegistrantUpsertWithoutRegistrationInputSchema).optional(),
  connect: z.lazy(() => RegistrantWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RegistrantUpdateToOneWithWhereWithoutRegistrationInputSchema),z.lazy(() => RegistrantUpdateWithoutRegistrationInputSchema),z.lazy(() => RegistrantUncheckedUpdateWithoutRegistrationInputSchema) ]).optional(),
}).strict();

export const ParticipantUpdateManyWithoutRegistrationNestedInputSchema: z.ZodType<Prisma.ParticipantUpdateManyWithoutRegistrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => ParticipantCreateWithoutRegistrationInputSchema),z.lazy(() => ParticipantCreateWithoutRegistrationInputSchema).array(),z.lazy(() => ParticipantUncheckedCreateWithoutRegistrationInputSchema),z.lazy(() => ParticipantUncheckedCreateWithoutRegistrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ParticipantCreateOrConnectWithoutRegistrationInputSchema),z.lazy(() => ParticipantCreateOrConnectWithoutRegistrationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ParticipantUpsertWithWhereUniqueWithoutRegistrationInputSchema),z.lazy(() => ParticipantUpsertWithWhereUniqueWithoutRegistrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ParticipantCreateManyRegistrationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ParticipantWhereUniqueInputSchema),z.lazy(() => ParticipantWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ParticipantWhereUniqueInputSchema),z.lazy(() => ParticipantWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ParticipantWhereUniqueInputSchema),z.lazy(() => ParticipantWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ParticipantWhereUniqueInputSchema),z.lazy(() => ParticipantWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ParticipantUpdateWithWhereUniqueWithoutRegistrationInputSchema),z.lazy(() => ParticipantUpdateWithWhereUniqueWithoutRegistrationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ParticipantUpdateManyWithWhereWithoutRegistrationInputSchema),z.lazy(() => ParticipantUpdateManyWithWhereWithoutRegistrationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ParticipantScalarWhereInputSchema),z.lazy(() => ParticipantScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VesselUpdateOneRequiredWithoutRegistrationNestedInputSchema: z.ZodType<Prisma.VesselUpdateOneRequiredWithoutRegistrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => VesselCreateWithoutRegistrationInputSchema),z.lazy(() => VesselUncheckedCreateWithoutRegistrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VesselCreateOrConnectWithoutRegistrationInputSchema).optional(),
  upsert: z.lazy(() => VesselUpsertWithoutRegistrationInputSchema).optional(),
  connect: z.lazy(() => VesselWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VesselUpdateToOneWithWhereWithoutRegistrationInputSchema),z.lazy(() => VesselUpdateWithoutRegistrationInputSchema),z.lazy(() => VesselUncheckedUpdateWithoutRegistrationInputSchema) ]).optional(),
}).strict();

export const EventUpdateOneRequiredWithoutRegistrationsNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutRegistrationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutRegistrationsInputSchema),z.lazy(() => EventUncheckedCreateWithoutRegistrationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutRegistrationsInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutRegistrationsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutRegistrationsInputSchema),z.lazy(() => EventUpdateWithoutRegistrationsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutRegistrationsInputSchema) ]).optional(),
}).strict();

export const ParticipantUncheckedUpdateManyWithoutRegistrationNestedInputSchema: z.ZodType<Prisma.ParticipantUncheckedUpdateManyWithoutRegistrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => ParticipantCreateWithoutRegistrationInputSchema),z.lazy(() => ParticipantCreateWithoutRegistrationInputSchema).array(),z.lazy(() => ParticipantUncheckedCreateWithoutRegistrationInputSchema),z.lazy(() => ParticipantUncheckedCreateWithoutRegistrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ParticipantCreateOrConnectWithoutRegistrationInputSchema),z.lazy(() => ParticipantCreateOrConnectWithoutRegistrationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ParticipantUpsertWithWhereUniqueWithoutRegistrationInputSchema),z.lazy(() => ParticipantUpsertWithWhereUniqueWithoutRegistrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ParticipantCreateManyRegistrationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ParticipantWhereUniqueInputSchema),z.lazy(() => ParticipantWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ParticipantWhereUniqueInputSchema),z.lazy(() => ParticipantWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ParticipantWhereUniqueInputSchema),z.lazy(() => ParticipantWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ParticipantWhereUniqueInputSchema),z.lazy(() => ParticipantWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ParticipantUpdateWithWhereUniqueWithoutRegistrationInputSchema),z.lazy(() => ParticipantUpdateWithWhereUniqueWithoutRegistrationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ParticipantUpdateManyWithWhereWithoutRegistrationInputSchema),z.lazy(() => ParticipantUpdateManyWithWhereWithoutRegistrationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ParticipantScalarWhereInputSchema),z.lazy(() => ParticipantScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VesselCreateNestedManyWithoutTypeInputSchema: z.ZodType<Prisma.VesselCreateNestedManyWithoutTypeInput> = z.object({
  create: z.union([ z.lazy(() => VesselCreateWithoutTypeInputSchema),z.lazy(() => VesselCreateWithoutTypeInputSchema).array(),z.lazy(() => VesselUncheckedCreateWithoutTypeInputSchema),z.lazy(() => VesselUncheckedCreateWithoutTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VesselCreateOrConnectWithoutTypeInputSchema),z.lazy(() => VesselCreateOrConnectWithoutTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VesselCreateManyTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VesselWhereUniqueInputSchema),z.lazy(() => VesselWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedManyWithoutVessel_typesInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutVessel_typesInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutVessel_typesInputSchema),z.lazy(() => EventCreateWithoutVessel_typesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutVessel_typesInputSchema),z.lazy(() => EventUncheckedCreateWithoutVessel_typesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutVessel_typesInputSchema),z.lazy(() => EventCreateOrConnectWithoutVessel_typesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VesselUncheckedCreateNestedManyWithoutTypeInputSchema: z.ZodType<Prisma.VesselUncheckedCreateNestedManyWithoutTypeInput> = z.object({
  create: z.union([ z.lazy(() => VesselCreateWithoutTypeInputSchema),z.lazy(() => VesselCreateWithoutTypeInputSchema).array(),z.lazy(() => VesselUncheckedCreateWithoutTypeInputSchema),z.lazy(() => VesselUncheckedCreateWithoutTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VesselCreateOrConnectWithoutTypeInputSchema),z.lazy(() => VesselCreateOrConnectWithoutTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VesselCreateManyTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VesselWhereUniqueInputSchema),z.lazy(() => VesselWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutVessel_typesInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutVessel_typesInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutVessel_typesInputSchema),z.lazy(() => EventCreateWithoutVessel_typesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutVessel_typesInputSchema),z.lazy(() => EventUncheckedCreateWithoutVessel_typesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutVessel_typesInputSchema),z.lazy(() => EventCreateOrConnectWithoutVessel_typesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VesselUpdateManyWithoutTypeNestedInputSchema: z.ZodType<Prisma.VesselUpdateManyWithoutTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => VesselCreateWithoutTypeInputSchema),z.lazy(() => VesselCreateWithoutTypeInputSchema).array(),z.lazy(() => VesselUncheckedCreateWithoutTypeInputSchema),z.lazy(() => VesselUncheckedCreateWithoutTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VesselCreateOrConnectWithoutTypeInputSchema),z.lazy(() => VesselCreateOrConnectWithoutTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VesselUpsertWithWhereUniqueWithoutTypeInputSchema),z.lazy(() => VesselUpsertWithWhereUniqueWithoutTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VesselCreateManyTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VesselWhereUniqueInputSchema),z.lazy(() => VesselWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VesselWhereUniqueInputSchema),z.lazy(() => VesselWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VesselWhereUniqueInputSchema),z.lazy(() => VesselWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VesselWhereUniqueInputSchema),z.lazy(() => VesselWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VesselUpdateWithWhereUniqueWithoutTypeInputSchema),z.lazy(() => VesselUpdateWithWhereUniqueWithoutTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VesselUpdateManyWithWhereWithoutTypeInputSchema),z.lazy(() => VesselUpdateManyWithWhereWithoutTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VesselScalarWhereInputSchema),z.lazy(() => VesselScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUpdateManyWithoutVessel_typesNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutVessel_typesNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutVessel_typesInputSchema),z.lazy(() => EventCreateWithoutVessel_typesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutVessel_typesInputSchema),z.lazy(() => EventUncheckedCreateWithoutVessel_typesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutVessel_typesInputSchema),z.lazy(() => EventCreateOrConnectWithoutVessel_typesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutVessel_typesInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutVessel_typesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutVessel_typesInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutVessel_typesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutVessel_typesInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutVessel_typesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VesselUncheckedUpdateManyWithoutTypeNestedInputSchema: z.ZodType<Prisma.VesselUncheckedUpdateManyWithoutTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => VesselCreateWithoutTypeInputSchema),z.lazy(() => VesselCreateWithoutTypeInputSchema).array(),z.lazy(() => VesselUncheckedCreateWithoutTypeInputSchema),z.lazy(() => VesselUncheckedCreateWithoutTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VesselCreateOrConnectWithoutTypeInputSchema),z.lazy(() => VesselCreateOrConnectWithoutTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VesselUpsertWithWhereUniqueWithoutTypeInputSchema),z.lazy(() => VesselUpsertWithWhereUniqueWithoutTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VesselCreateManyTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VesselWhereUniqueInputSchema),z.lazy(() => VesselWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VesselWhereUniqueInputSchema),z.lazy(() => VesselWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VesselWhereUniqueInputSchema),z.lazy(() => VesselWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VesselWhereUniqueInputSchema),z.lazy(() => VesselWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VesselUpdateWithWhereUniqueWithoutTypeInputSchema),z.lazy(() => VesselUpdateWithWhereUniqueWithoutTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VesselUpdateManyWithWhereWithoutTypeInputSchema),z.lazy(() => VesselUpdateManyWithWhereWithoutTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VesselScalarWhereInputSchema),z.lazy(() => VesselScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutVessel_typesNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutVessel_typesNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutVessel_typesInputSchema),z.lazy(() => EventCreateWithoutVessel_typesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutVessel_typesInputSchema),z.lazy(() => EventUncheckedCreateWithoutVessel_typesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutVessel_typesInputSchema),z.lazy(() => EventCreateOrConnectWithoutVessel_typesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutVessel_typesInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutVessel_typesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutVessel_typesInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutVessel_typesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutVessel_typesInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutVessel_typesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VesselTypeCreateNestedOneWithoutVesselsInputSchema: z.ZodType<Prisma.VesselTypeCreateNestedOneWithoutVesselsInput> = z.object({
  create: z.union([ z.lazy(() => VesselTypeCreateWithoutVesselsInputSchema),z.lazy(() => VesselTypeUncheckedCreateWithoutVesselsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VesselTypeCreateOrConnectWithoutVesselsInputSchema).optional(),
  connect: z.lazy(() => VesselTypeWhereUniqueInputSchema).optional()
}).strict();

export const RegistrationCreateNestedManyWithoutVesselInputSchema: z.ZodType<Prisma.RegistrationCreateNestedManyWithoutVesselInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutVesselInputSchema),z.lazy(() => RegistrationCreateWithoutVesselInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutVesselInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutVesselInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutVesselInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutVesselInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyVesselInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RegistrationUncheckedCreateNestedManyWithoutVesselInputSchema: z.ZodType<Prisma.RegistrationUncheckedCreateNestedManyWithoutVesselInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutVesselInputSchema),z.lazy(() => RegistrationCreateWithoutVesselInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutVesselInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutVesselInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutVesselInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutVesselInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyVesselInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VesselTypeUpdateOneRequiredWithoutVesselsNestedInputSchema: z.ZodType<Prisma.VesselTypeUpdateOneRequiredWithoutVesselsNestedInput> = z.object({
  create: z.union([ z.lazy(() => VesselTypeCreateWithoutVesselsInputSchema),z.lazy(() => VesselTypeUncheckedCreateWithoutVesselsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VesselTypeCreateOrConnectWithoutVesselsInputSchema).optional(),
  upsert: z.lazy(() => VesselTypeUpsertWithoutVesselsInputSchema).optional(),
  connect: z.lazy(() => VesselTypeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VesselTypeUpdateToOneWithWhereWithoutVesselsInputSchema),z.lazy(() => VesselTypeUpdateWithoutVesselsInputSchema),z.lazy(() => VesselTypeUncheckedUpdateWithoutVesselsInputSchema) ]).optional(),
}).strict();

export const RegistrationUpdateManyWithoutVesselNestedInputSchema: z.ZodType<Prisma.RegistrationUpdateManyWithoutVesselNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutVesselInputSchema),z.lazy(() => RegistrationCreateWithoutVesselInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutVesselInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutVesselInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutVesselInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutVesselInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutVesselInputSchema),z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutVesselInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyVesselInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutVesselInputSchema),z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutVesselInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RegistrationUpdateManyWithWhereWithoutVesselInputSchema),z.lazy(() => RegistrationUpdateManyWithWhereWithoutVesselInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RegistrationScalarWhereInputSchema),z.lazy(() => RegistrationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RegistrationUncheckedUpdateManyWithoutVesselNestedInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateManyWithoutVesselNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegistrationCreateWithoutVesselInputSchema),z.lazy(() => RegistrationCreateWithoutVesselInputSchema).array(),z.lazy(() => RegistrationUncheckedCreateWithoutVesselInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutVesselInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegistrationCreateOrConnectWithoutVesselInputSchema),z.lazy(() => RegistrationCreateOrConnectWithoutVesselInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutVesselInputSchema),z.lazy(() => RegistrationUpsertWithWhereUniqueWithoutVesselInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RegistrationCreateManyVesselInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RegistrationWhereUniqueInputSchema),z.lazy(() => RegistrationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutVesselInputSchema),z.lazy(() => RegistrationUpdateWithWhereUniqueWithoutVesselInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RegistrationUpdateManyWithWhereWithoutVesselInputSchema),z.lazy(() => RegistrationUpdateManyWithWhereWithoutVesselInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RegistrationScalarWhereInputSchema),z.lazy(() => RegistrationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const VesselTypeCreateWithoutEventsInputSchema: z.ZodType<Prisma.VesselTypeCreateWithoutEventsInput> = z.object({
  id: z.string().uuid().optional(),
  max_registrants: z.number().int().optional(),
  type: z.string(),
  vessels: z.lazy(() => VesselCreateNestedManyWithoutTypeInputSchema).optional()
}).strict();

export const VesselTypeUncheckedCreateWithoutEventsInputSchema: z.ZodType<Prisma.VesselTypeUncheckedCreateWithoutEventsInput> = z.object({
  id: z.string().uuid().optional(),
  max_registrants: z.number().int().optional(),
  type: z.string(),
  vessels: z.lazy(() => VesselUncheckedCreateNestedManyWithoutTypeInputSchema).optional()
}).strict();

export const VesselTypeCreateOrConnectWithoutEventsInputSchema: z.ZodType<Prisma.VesselTypeCreateOrConnectWithoutEventsInput> = z.object({
  where: z.lazy(() => VesselTypeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VesselTypeCreateWithoutEventsInputSchema),z.lazy(() => VesselTypeUncheckedCreateWithoutEventsInputSchema) ]),
}).strict();

export const RegistrationCreateWithoutEventInputSchema: z.ZodType<Prisma.RegistrationCreateWithoutEventInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  assosciation: z.string().optional().nullable(),
  registrant: z.lazy(() => RegistrantCreateNestedOneWithoutRegistrationInputSchema),
  participants: z.lazy(() => ParticipantCreateNestedManyWithoutRegistrationInputSchema).optional(),
  vessel: z.lazy(() => VesselCreateNestedOneWithoutRegistrationInputSchema)
}).strict();

export const RegistrationUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.RegistrationUncheckedCreateWithoutEventInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  registrant_id: z.string(),
  vessel_id: z.string(),
  assosciation: z.string().optional().nullable(),
  participants: z.lazy(() => ParticipantUncheckedCreateNestedManyWithoutRegistrationInputSchema).optional()
}).strict();

export const RegistrationCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.RegistrationCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => RegistrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RegistrationCreateWithoutEventInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const RegistrationCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.RegistrationCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RegistrationCreateManyEventInputSchema),z.lazy(() => RegistrationCreateManyEventInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VesselTypeUpsertWithWhereUniqueWithoutEventsInputSchema: z.ZodType<Prisma.VesselTypeUpsertWithWhereUniqueWithoutEventsInput> = z.object({
  where: z.lazy(() => VesselTypeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VesselTypeUpdateWithoutEventsInputSchema),z.lazy(() => VesselTypeUncheckedUpdateWithoutEventsInputSchema) ]),
  create: z.union([ z.lazy(() => VesselTypeCreateWithoutEventsInputSchema),z.lazy(() => VesselTypeUncheckedCreateWithoutEventsInputSchema) ]),
}).strict();

export const VesselTypeUpdateWithWhereUniqueWithoutEventsInputSchema: z.ZodType<Prisma.VesselTypeUpdateWithWhereUniqueWithoutEventsInput> = z.object({
  where: z.lazy(() => VesselTypeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VesselTypeUpdateWithoutEventsInputSchema),z.lazy(() => VesselTypeUncheckedUpdateWithoutEventsInputSchema) ]),
}).strict();

export const VesselTypeUpdateManyWithWhereWithoutEventsInputSchema: z.ZodType<Prisma.VesselTypeUpdateManyWithWhereWithoutEventsInput> = z.object({
  where: z.lazy(() => VesselTypeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VesselTypeUpdateManyMutationInputSchema),z.lazy(() => VesselTypeUncheckedUpdateManyWithoutEventsInputSchema) ]),
}).strict();

export const VesselTypeScalarWhereInputSchema: z.ZodType<Prisma.VesselTypeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VesselTypeScalarWhereInputSchema),z.lazy(() => VesselTypeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VesselTypeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VesselTypeScalarWhereInputSchema),z.lazy(() => VesselTypeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  max_registrants: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const RegistrationUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.RegistrationUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => RegistrationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RegistrationUpdateWithoutEventInputSchema),z.lazy(() => RegistrationUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => RegistrationCreateWithoutEventInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const RegistrationUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.RegistrationUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => RegistrationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RegistrationUpdateWithoutEventInputSchema),z.lazy(() => RegistrationUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const RegistrationUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.RegistrationUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => RegistrationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RegistrationUpdateManyMutationInputSchema),z.lazy(() => RegistrationUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const RegistrationScalarWhereInputSchema: z.ZodType<Prisma.RegistrationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RegistrationScalarWhereInputSchema),z.lazy(() => RegistrationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegistrationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegistrationScalarWhereInputSchema),z.lazy(() => RegistrationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  music_request: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  registrant_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vessel_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assosciation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const RegistrationCreateWithoutParticipantsInputSchema: z.ZodType<Prisma.RegistrationCreateWithoutParticipantsInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  assosciation: z.string().optional().nullable(),
  registrant: z.lazy(() => RegistrantCreateNestedOneWithoutRegistrationInputSchema),
  vessel: z.lazy(() => VesselCreateNestedOneWithoutRegistrationInputSchema),
  event: z.lazy(() => EventCreateNestedOneWithoutRegistrationsInputSchema)
}).strict();

export const RegistrationUncheckedCreateWithoutParticipantsInputSchema: z.ZodType<Prisma.RegistrationUncheckedCreateWithoutParticipantsInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  registrant_id: z.string(),
  vessel_id: z.string(),
  assosciation: z.string().optional().nullable(),
  eventId: z.string()
}).strict();

export const RegistrationCreateOrConnectWithoutParticipantsInputSchema: z.ZodType<Prisma.RegistrationCreateOrConnectWithoutParticipantsInput> = z.object({
  where: z.lazy(() => RegistrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RegistrationCreateWithoutParticipantsInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutParticipantsInputSchema) ]),
}).strict();

export const RegistrationUpsertWithoutParticipantsInputSchema: z.ZodType<Prisma.RegistrationUpsertWithoutParticipantsInput> = z.object({
  update: z.union([ z.lazy(() => RegistrationUpdateWithoutParticipantsInputSchema),z.lazy(() => RegistrationUncheckedUpdateWithoutParticipantsInputSchema) ]),
  create: z.union([ z.lazy(() => RegistrationCreateWithoutParticipantsInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutParticipantsInputSchema) ]),
  where: z.lazy(() => RegistrationWhereInputSchema).optional()
}).strict();

export const RegistrationUpdateToOneWithWhereWithoutParticipantsInputSchema: z.ZodType<Prisma.RegistrationUpdateToOneWithWhereWithoutParticipantsInput> = z.object({
  where: z.lazy(() => RegistrationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RegistrationUpdateWithoutParticipantsInputSchema),z.lazy(() => RegistrationUncheckedUpdateWithoutParticipantsInputSchema) ]),
}).strict();

export const RegistrationUpdateWithoutParticipantsInputSchema: z.ZodType<Prisma.RegistrationUpdateWithoutParticipantsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrant: z.lazy(() => RegistrantUpdateOneRequiredWithoutRegistrationNestedInputSchema).optional(),
  vessel: z.lazy(() => VesselUpdateOneRequiredWithoutRegistrationNestedInputSchema).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutRegistrationsNestedInputSchema).optional()
}).strict();

export const RegistrationUncheckedUpdateWithoutParticipantsInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateWithoutParticipantsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RegistrationCreateWithoutRegistrantInputSchema: z.ZodType<Prisma.RegistrationCreateWithoutRegistrantInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  assosciation: z.string().optional().nullable(),
  participants: z.lazy(() => ParticipantCreateNestedManyWithoutRegistrationInputSchema).optional(),
  vessel: z.lazy(() => VesselCreateNestedOneWithoutRegistrationInputSchema),
  event: z.lazy(() => EventCreateNestedOneWithoutRegistrationsInputSchema)
}).strict();

export const RegistrationUncheckedCreateWithoutRegistrantInputSchema: z.ZodType<Prisma.RegistrationUncheckedCreateWithoutRegistrantInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  vessel_id: z.string(),
  assosciation: z.string().optional().nullable(),
  eventId: z.string(),
  participants: z.lazy(() => ParticipantUncheckedCreateNestedManyWithoutRegistrationInputSchema).optional()
}).strict();

export const RegistrationCreateOrConnectWithoutRegistrantInputSchema: z.ZodType<Prisma.RegistrationCreateOrConnectWithoutRegistrantInput> = z.object({
  where: z.lazy(() => RegistrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RegistrationCreateWithoutRegistrantInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutRegistrantInputSchema) ]),
}).strict();

export const RegistrationCreateManyRegistrantInputEnvelopeSchema: z.ZodType<Prisma.RegistrationCreateManyRegistrantInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RegistrationCreateManyRegistrantInputSchema),z.lazy(() => RegistrationCreateManyRegistrantInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RegistrationUpsertWithWhereUniqueWithoutRegistrantInputSchema: z.ZodType<Prisma.RegistrationUpsertWithWhereUniqueWithoutRegistrantInput> = z.object({
  where: z.lazy(() => RegistrationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RegistrationUpdateWithoutRegistrantInputSchema),z.lazy(() => RegistrationUncheckedUpdateWithoutRegistrantInputSchema) ]),
  create: z.union([ z.lazy(() => RegistrationCreateWithoutRegistrantInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutRegistrantInputSchema) ]),
}).strict();

export const RegistrationUpdateWithWhereUniqueWithoutRegistrantInputSchema: z.ZodType<Prisma.RegistrationUpdateWithWhereUniqueWithoutRegistrantInput> = z.object({
  where: z.lazy(() => RegistrationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RegistrationUpdateWithoutRegistrantInputSchema),z.lazy(() => RegistrationUncheckedUpdateWithoutRegistrantInputSchema) ]),
}).strict();

export const RegistrationUpdateManyWithWhereWithoutRegistrantInputSchema: z.ZodType<Prisma.RegistrationUpdateManyWithWhereWithoutRegistrantInput> = z.object({
  where: z.lazy(() => RegistrationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RegistrationUpdateManyMutationInputSchema),z.lazy(() => RegistrationUncheckedUpdateManyWithoutRegistrantInputSchema) ]),
}).strict();

export const RegistrantCreateWithoutRegistrationInputSchema: z.ZodType<Prisma.RegistrantCreateWithoutRegistrationInput> = z.object({
  id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  date_of_birth: z.coerce.date(),
  place_of_birth: z.string()
}).strict();

export const RegistrantUncheckedCreateWithoutRegistrationInputSchema: z.ZodType<Prisma.RegistrantUncheckedCreateWithoutRegistrationInput> = z.object({
  id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  date_of_birth: z.coerce.date(),
  place_of_birth: z.string()
}).strict();

export const RegistrantCreateOrConnectWithoutRegistrationInputSchema: z.ZodType<Prisma.RegistrantCreateOrConnectWithoutRegistrationInput> = z.object({
  where: z.lazy(() => RegistrantWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RegistrantCreateWithoutRegistrationInputSchema),z.lazy(() => RegistrantUncheckedCreateWithoutRegistrationInputSchema) ]),
}).strict();

export const ParticipantCreateWithoutRegistrationInputSchema: z.ZodType<Prisma.ParticipantCreateWithoutRegistrationInput> = z.object({
  id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date()
}).strict();

export const ParticipantUncheckedCreateWithoutRegistrationInputSchema: z.ZodType<Prisma.ParticipantUncheckedCreateWithoutRegistrationInput> = z.object({
  id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date()
}).strict();

export const ParticipantCreateOrConnectWithoutRegistrationInputSchema: z.ZodType<Prisma.ParticipantCreateOrConnectWithoutRegistrationInput> = z.object({
  where: z.lazy(() => ParticipantWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ParticipantCreateWithoutRegistrationInputSchema),z.lazy(() => ParticipantUncheckedCreateWithoutRegistrationInputSchema) ]),
}).strict();

export const ParticipantCreateManyRegistrationInputEnvelopeSchema: z.ZodType<Prisma.ParticipantCreateManyRegistrationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ParticipantCreateManyRegistrationInputSchema),z.lazy(() => ParticipantCreateManyRegistrationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VesselCreateWithoutRegistrationInputSchema: z.ZodType<Prisma.VesselCreateWithoutRegistrationInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.lazy(() => VesselTypeCreateNestedOneWithoutVesselsInputSchema)
}).strict();

export const VesselUncheckedCreateWithoutRegistrationInputSchema: z.ZodType<Prisma.VesselUncheckedCreateWithoutRegistrationInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  vessel_type_id: z.string()
}).strict();

export const VesselCreateOrConnectWithoutRegistrationInputSchema: z.ZodType<Prisma.VesselCreateOrConnectWithoutRegistrationInput> = z.object({
  where: z.lazy(() => VesselWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VesselCreateWithoutRegistrationInputSchema),z.lazy(() => VesselUncheckedCreateWithoutRegistrationInputSchema) ]),
}).strict();

export const EventCreateWithoutRegistrationsInputSchema: z.ZodType<Prisma.EventCreateWithoutRegistrationsInput> = z.object({
  id: z.string().uuid().optional(),
  year: z.number().int(),
  registration_start_date: z.coerce.date(),
  vessel_types: z.lazy(() => VesselTypeCreateNestedManyWithoutEventsInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutRegistrationsInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutRegistrationsInput> = z.object({
  id: z.string().uuid().optional(),
  year: z.number().int(),
  registration_start_date: z.coerce.date(),
  vessel_types: z.lazy(() => VesselTypeUncheckedCreateNestedManyWithoutEventsInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutRegistrationsInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutRegistrationsInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutRegistrationsInputSchema),z.lazy(() => EventUncheckedCreateWithoutRegistrationsInputSchema) ]),
}).strict();

export const RegistrantUpsertWithoutRegistrationInputSchema: z.ZodType<Prisma.RegistrantUpsertWithoutRegistrationInput> = z.object({
  update: z.union([ z.lazy(() => RegistrantUpdateWithoutRegistrationInputSchema),z.lazy(() => RegistrantUncheckedUpdateWithoutRegistrationInputSchema) ]),
  create: z.union([ z.lazy(() => RegistrantCreateWithoutRegistrationInputSchema),z.lazy(() => RegistrantUncheckedCreateWithoutRegistrationInputSchema) ]),
  where: z.lazy(() => RegistrantWhereInputSchema).optional()
}).strict();

export const RegistrantUpdateToOneWithWhereWithoutRegistrationInputSchema: z.ZodType<Prisma.RegistrantUpdateToOneWithWhereWithoutRegistrationInput> = z.object({
  where: z.lazy(() => RegistrantWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RegistrantUpdateWithoutRegistrationInputSchema),z.lazy(() => RegistrantUncheckedUpdateWithoutRegistrationInputSchema) ]),
}).strict();

export const RegistrantUpdateWithoutRegistrationInputSchema: z.ZodType<Prisma.RegistrantUpdateWithoutRegistrationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  place_of_birth: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RegistrantUncheckedUpdateWithoutRegistrationInputSchema: z.ZodType<Prisma.RegistrantUncheckedUpdateWithoutRegistrationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  place_of_birth: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ParticipantUpsertWithWhereUniqueWithoutRegistrationInputSchema: z.ZodType<Prisma.ParticipantUpsertWithWhereUniqueWithoutRegistrationInput> = z.object({
  where: z.lazy(() => ParticipantWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ParticipantUpdateWithoutRegistrationInputSchema),z.lazy(() => ParticipantUncheckedUpdateWithoutRegistrationInputSchema) ]),
  create: z.union([ z.lazy(() => ParticipantCreateWithoutRegistrationInputSchema),z.lazy(() => ParticipantUncheckedCreateWithoutRegistrationInputSchema) ]),
}).strict();

export const ParticipantUpdateWithWhereUniqueWithoutRegistrationInputSchema: z.ZodType<Prisma.ParticipantUpdateWithWhereUniqueWithoutRegistrationInput> = z.object({
  where: z.lazy(() => ParticipantWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ParticipantUpdateWithoutRegistrationInputSchema),z.lazy(() => ParticipantUncheckedUpdateWithoutRegistrationInputSchema) ]),
}).strict();

export const ParticipantUpdateManyWithWhereWithoutRegistrationInputSchema: z.ZodType<Prisma.ParticipantUpdateManyWithWhereWithoutRegistrationInput> = z.object({
  where: z.lazy(() => ParticipantScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ParticipantUpdateManyMutationInputSchema),z.lazy(() => ParticipantUncheckedUpdateManyWithoutRegistrationInputSchema) ]),
}).strict();

export const ParticipantScalarWhereInputSchema: z.ZodType<Prisma.ParticipantScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ParticipantScalarWhereInputSchema),z.lazy(() => ParticipantScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ParticipantScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ParticipantScalarWhereInputSchema),z.lazy(() => ParticipantScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date_of_birth: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  registration_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const VesselUpsertWithoutRegistrationInputSchema: z.ZodType<Prisma.VesselUpsertWithoutRegistrationInput> = z.object({
  update: z.union([ z.lazy(() => VesselUpdateWithoutRegistrationInputSchema),z.lazy(() => VesselUncheckedUpdateWithoutRegistrationInputSchema) ]),
  create: z.union([ z.lazy(() => VesselCreateWithoutRegistrationInputSchema),z.lazy(() => VesselUncheckedCreateWithoutRegistrationInputSchema) ]),
  where: z.lazy(() => VesselWhereInputSchema).optional()
}).strict();

export const VesselUpdateToOneWithWhereWithoutRegistrationInputSchema: z.ZodType<Prisma.VesselUpdateToOneWithWhereWithoutRegistrationInput> = z.object({
  where: z.lazy(() => VesselWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => VesselUpdateWithoutRegistrationInputSchema),z.lazy(() => VesselUncheckedUpdateWithoutRegistrationInputSchema) ]),
}).strict();

export const VesselUpdateWithoutRegistrationInputSchema: z.ZodType<Prisma.VesselUpdateWithoutRegistrationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.lazy(() => VesselTypeUpdateOneRequiredWithoutVesselsNestedInputSchema).optional()
}).strict();

export const VesselUncheckedUpdateWithoutRegistrationInputSchema: z.ZodType<Prisma.VesselUncheckedUpdateWithoutRegistrationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_type_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUpsertWithoutRegistrationsInputSchema: z.ZodType<Prisma.EventUpsertWithoutRegistrationsInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutRegistrationsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutRegistrationsInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutRegistrationsInputSchema),z.lazy(() => EventUncheckedCreateWithoutRegistrationsInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutRegistrationsInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutRegistrationsInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutRegistrationsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutRegistrationsInputSchema) ]),
}).strict();

export const EventUpdateWithoutRegistrationsInputSchema: z.ZodType<Prisma.EventUpdateWithoutRegistrationsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  registration_start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_types: z.lazy(() => VesselTypeUpdateManyWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutRegistrationsInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutRegistrationsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  registration_start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_types: z.lazy(() => VesselTypeUncheckedUpdateManyWithoutEventsNestedInputSchema).optional()
}).strict();

export const VesselCreateWithoutTypeInputSchema: z.ZodType<Prisma.VesselCreateWithoutTypeInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  registration: z.lazy(() => RegistrationCreateNestedManyWithoutVesselInputSchema).optional()
}).strict();

export const VesselUncheckedCreateWithoutTypeInputSchema: z.ZodType<Prisma.VesselUncheckedCreateWithoutTypeInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  registration: z.lazy(() => RegistrationUncheckedCreateNestedManyWithoutVesselInputSchema).optional()
}).strict();

export const VesselCreateOrConnectWithoutTypeInputSchema: z.ZodType<Prisma.VesselCreateOrConnectWithoutTypeInput> = z.object({
  where: z.lazy(() => VesselWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VesselCreateWithoutTypeInputSchema),z.lazy(() => VesselUncheckedCreateWithoutTypeInputSchema) ]),
}).strict();

export const VesselCreateManyTypeInputEnvelopeSchema: z.ZodType<Prisma.VesselCreateManyTypeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VesselCreateManyTypeInputSchema),z.lazy(() => VesselCreateManyTypeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventCreateWithoutVessel_typesInputSchema: z.ZodType<Prisma.EventCreateWithoutVessel_typesInput> = z.object({
  id: z.string().uuid().optional(),
  year: z.number().int(),
  registration_start_date: z.coerce.date(),
  registrations: z.lazy(() => RegistrationCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutVessel_typesInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutVessel_typesInput> = z.object({
  id: z.string().uuid().optional(),
  year: z.number().int(),
  registration_start_date: z.coerce.date(),
  registrations: z.lazy(() => RegistrationUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutVessel_typesInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutVessel_typesInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutVessel_typesInputSchema),z.lazy(() => EventUncheckedCreateWithoutVessel_typesInputSchema) ]),
}).strict();

export const VesselUpsertWithWhereUniqueWithoutTypeInputSchema: z.ZodType<Prisma.VesselUpsertWithWhereUniqueWithoutTypeInput> = z.object({
  where: z.lazy(() => VesselWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VesselUpdateWithoutTypeInputSchema),z.lazy(() => VesselUncheckedUpdateWithoutTypeInputSchema) ]),
  create: z.union([ z.lazy(() => VesselCreateWithoutTypeInputSchema),z.lazy(() => VesselUncheckedCreateWithoutTypeInputSchema) ]),
}).strict();

export const VesselUpdateWithWhereUniqueWithoutTypeInputSchema: z.ZodType<Prisma.VesselUpdateWithWhereUniqueWithoutTypeInput> = z.object({
  where: z.lazy(() => VesselWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VesselUpdateWithoutTypeInputSchema),z.lazy(() => VesselUncheckedUpdateWithoutTypeInputSchema) ]),
}).strict();

export const VesselUpdateManyWithWhereWithoutTypeInputSchema: z.ZodType<Prisma.VesselUpdateManyWithWhereWithoutTypeInput> = z.object({
  where: z.lazy(() => VesselScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VesselUpdateManyMutationInputSchema),z.lazy(() => VesselUncheckedUpdateManyWithoutTypeInputSchema) ]),
}).strict();

export const VesselScalarWhereInputSchema: z.ZodType<Prisma.VesselScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VesselScalarWhereInputSchema),z.lazy(() => VesselScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VesselScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VesselScalarWhereInputSchema),z.lazy(() => VesselScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vessel_type_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const EventUpsertWithWhereUniqueWithoutVessel_typesInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutVessel_typesInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutVessel_typesInputSchema),z.lazy(() => EventUncheckedUpdateWithoutVessel_typesInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutVessel_typesInputSchema),z.lazy(() => EventUncheckedCreateWithoutVessel_typesInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutVessel_typesInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutVessel_typesInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutVessel_typesInputSchema),z.lazy(() => EventUncheckedUpdateWithoutVessel_typesInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutVessel_typesInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutVessel_typesInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutVessel_typesInputSchema) ]),
}).strict();

export const EventScalarWhereInputSchema: z.ZodType<Prisma.EventScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  registration_start_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VesselTypeCreateWithoutVesselsInputSchema: z.ZodType<Prisma.VesselTypeCreateWithoutVesselsInput> = z.object({
  id: z.string().uuid().optional(),
  max_registrants: z.number().int().optional(),
  type: z.string(),
  events: z.lazy(() => EventCreateNestedManyWithoutVessel_typesInputSchema).optional()
}).strict();

export const VesselTypeUncheckedCreateWithoutVesselsInputSchema: z.ZodType<Prisma.VesselTypeUncheckedCreateWithoutVesselsInput> = z.object({
  id: z.string().uuid().optional(),
  max_registrants: z.number().int().optional(),
  type: z.string(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutVessel_typesInputSchema).optional()
}).strict();

export const VesselTypeCreateOrConnectWithoutVesselsInputSchema: z.ZodType<Prisma.VesselTypeCreateOrConnectWithoutVesselsInput> = z.object({
  where: z.lazy(() => VesselTypeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VesselTypeCreateWithoutVesselsInputSchema),z.lazy(() => VesselTypeUncheckedCreateWithoutVesselsInputSchema) ]),
}).strict();

export const RegistrationCreateWithoutVesselInputSchema: z.ZodType<Prisma.RegistrationCreateWithoutVesselInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  assosciation: z.string().optional().nullable(),
  registrant: z.lazy(() => RegistrantCreateNestedOneWithoutRegistrationInputSchema),
  participants: z.lazy(() => ParticipantCreateNestedManyWithoutRegistrationInputSchema).optional(),
  event: z.lazy(() => EventCreateNestedOneWithoutRegistrationsInputSchema)
}).strict();

export const RegistrationUncheckedCreateWithoutVesselInputSchema: z.ZodType<Prisma.RegistrationUncheckedCreateWithoutVesselInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  registrant_id: z.string(),
  assosciation: z.string().optional().nullable(),
  eventId: z.string(),
  participants: z.lazy(() => ParticipantUncheckedCreateNestedManyWithoutRegistrationInputSchema).optional()
}).strict();

export const RegistrationCreateOrConnectWithoutVesselInputSchema: z.ZodType<Prisma.RegistrationCreateOrConnectWithoutVesselInput> = z.object({
  where: z.lazy(() => RegistrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RegistrationCreateWithoutVesselInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutVesselInputSchema) ]),
}).strict();

export const RegistrationCreateManyVesselInputEnvelopeSchema: z.ZodType<Prisma.RegistrationCreateManyVesselInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RegistrationCreateManyVesselInputSchema),z.lazy(() => RegistrationCreateManyVesselInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VesselTypeUpsertWithoutVesselsInputSchema: z.ZodType<Prisma.VesselTypeUpsertWithoutVesselsInput> = z.object({
  update: z.union([ z.lazy(() => VesselTypeUpdateWithoutVesselsInputSchema),z.lazy(() => VesselTypeUncheckedUpdateWithoutVesselsInputSchema) ]),
  create: z.union([ z.lazy(() => VesselTypeCreateWithoutVesselsInputSchema),z.lazy(() => VesselTypeUncheckedCreateWithoutVesselsInputSchema) ]),
  where: z.lazy(() => VesselTypeWhereInputSchema).optional()
}).strict();

export const VesselTypeUpdateToOneWithWhereWithoutVesselsInputSchema: z.ZodType<Prisma.VesselTypeUpdateToOneWithWhereWithoutVesselsInput> = z.object({
  where: z.lazy(() => VesselTypeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => VesselTypeUpdateWithoutVesselsInputSchema),z.lazy(() => VesselTypeUncheckedUpdateWithoutVesselsInputSchema) ]),
}).strict();

export const VesselTypeUpdateWithoutVesselsInputSchema: z.ZodType<Prisma.VesselTypeUpdateWithoutVesselsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_registrants: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => EventUpdateManyWithoutVessel_typesNestedInputSchema).optional()
}).strict();

export const VesselTypeUncheckedUpdateWithoutVesselsInputSchema: z.ZodType<Prisma.VesselTypeUncheckedUpdateWithoutVesselsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_registrants: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutVessel_typesNestedInputSchema).optional()
}).strict();

export const RegistrationUpsertWithWhereUniqueWithoutVesselInputSchema: z.ZodType<Prisma.RegistrationUpsertWithWhereUniqueWithoutVesselInput> = z.object({
  where: z.lazy(() => RegistrationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RegistrationUpdateWithoutVesselInputSchema),z.lazy(() => RegistrationUncheckedUpdateWithoutVesselInputSchema) ]),
  create: z.union([ z.lazy(() => RegistrationCreateWithoutVesselInputSchema),z.lazy(() => RegistrationUncheckedCreateWithoutVesselInputSchema) ]),
}).strict();

export const RegistrationUpdateWithWhereUniqueWithoutVesselInputSchema: z.ZodType<Prisma.RegistrationUpdateWithWhereUniqueWithoutVesselInput> = z.object({
  where: z.lazy(() => RegistrationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RegistrationUpdateWithoutVesselInputSchema),z.lazy(() => RegistrationUncheckedUpdateWithoutVesselInputSchema) ]),
}).strict();

export const RegistrationUpdateManyWithWhereWithoutVesselInputSchema: z.ZodType<Prisma.RegistrationUpdateManyWithWhereWithoutVesselInput> = z.object({
  where: z.lazy(() => RegistrationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RegistrationUpdateManyMutationInputSchema),z.lazy(() => RegistrationUncheckedUpdateManyWithoutVesselInputSchema) ]),
}).strict();

export const RegistrationCreateManyEventInputSchema: z.ZodType<Prisma.RegistrationCreateManyEventInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  registrant_id: z.string(),
  vessel_id: z.string(),
  assosciation: z.string().optional().nullable()
}).strict();

export const VesselTypeUpdateWithoutEventsInputSchema: z.ZodType<Prisma.VesselTypeUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_registrants: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessels: z.lazy(() => VesselUpdateManyWithoutTypeNestedInputSchema).optional()
}).strict();

export const VesselTypeUncheckedUpdateWithoutEventsInputSchema: z.ZodType<Prisma.VesselTypeUncheckedUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_registrants: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessels: z.lazy(() => VesselUncheckedUpdateManyWithoutTypeNestedInputSchema).optional()
}).strict();

export const VesselTypeUncheckedUpdateManyWithoutEventsInputSchema: z.ZodType<Prisma.VesselTypeUncheckedUpdateManyWithoutEventsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_registrants: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RegistrationUpdateWithoutEventInputSchema: z.ZodType<Prisma.RegistrationUpdateWithoutEventInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrant: z.lazy(() => RegistrantUpdateOneRequiredWithoutRegistrationNestedInputSchema).optional(),
  participants: z.lazy(() => ParticipantUpdateManyWithoutRegistrationNestedInputSchema).optional(),
  vessel: z.lazy(() => VesselUpdateOneRequiredWithoutRegistrationNestedInputSchema).optional()
}).strict();

export const RegistrationUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateWithoutEventInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  participants: z.lazy(() => ParticipantUncheckedUpdateManyWithoutRegistrationNestedInputSchema).optional()
}).strict();

export const RegistrationUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateManyWithoutEventInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vessel_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RegistrationCreateManyRegistrantInputSchema: z.ZodType<Prisma.RegistrationCreateManyRegistrantInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  vessel_id: z.string(),
  assosciation: z.string().optional().nullable(),
  eventId: z.string()
}).strict();

export const RegistrationUpdateWithoutRegistrantInputSchema: z.ZodType<Prisma.RegistrationUpdateWithoutRegistrantInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  participants: z.lazy(() => ParticipantUpdateManyWithoutRegistrationNestedInputSchema).optional(),
  vessel: z.lazy(() => VesselUpdateOneRequiredWithoutRegistrationNestedInputSchema).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutRegistrationsNestedInputSchema).optional()
}).strict();

export const RegistrationUncheckedUpdateWithoutRegistrantInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateWithoutRegistrantInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vessel_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  participants: z.lazy(() => ParticipantUncheckedUpdateManyWithoutRegistrationNestedInputSchema).optional()
}).strict();

export const RegistrationUncheckedUpdateManyWithoutRegistrantInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateManyWithoutRegistrantInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vessel_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ParticipantCreateManyRegistrationInputSchema: z.ZodType<Prisma.ParticipantCreateManyRegistrationInput> = z.object({
  id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.coerce.date()
}).strict();

export const ParticipantUpdateWithoutRegistrationInputSchema: z.ZodType<Prisma.ParticipantUpdateWithoutRegistrationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ParticipantUncheckedUpdateWithoutRegistrationInputSchema: z.ZodType<Prisma.ParticipantUncheckedUpdateWithoutRegistrationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ParticipantUncheckedUpdateManyWithoutRegistrationInputSchema: z.ZodType<Prisma.ParticipantUncheckedUpdateManyWithoutRegistrationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VesselCreateManyTypeInputSchema: z.ZodType<Prisma.VesselCreateManyTypeInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string()
}).strict();

export const VesselUpdateWithoutTypeInputSchema: z.ZodType<Prisma.VesselUpdateWithoutTypeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  registration: z.lazy(() => RegistrationUpdateManyWithoutVesselNestedInputSchema).optional()
}).strict();

export const VesselUncheckedUpdateWithoutTypeInputSchema: z.ZodType<Prisma.VesselUncheckedUpdateWithoutTypeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  registration: z.lazy(() => RegistrationUncheckedUpdateManyWithoutVesselNestedInputSchema).optional()
}).strict();

export const VesselUncheckedUpdateManyWithoutTypeInputSchema: z.ZodType<Prisma.VesselUncheckedUpdateManyWithoutTypeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUpdateWithoutVessel_typesInputSchema: z.ZodType<Prisma.EventUpdateWithoutVessel_typesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  registration_start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  registrations: z.lazy(() => RegistrationUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutVessel_typesInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutVessel_typesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  registration_start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  registrations: z.lazy(() => RegistrationUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateManyWithoutVessel_typesInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutVessel_typesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  registration_start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RegistrationCreateManyVesselInputSchema: z.ZodType<Prisma.RegistrationCreateManyVesselInput> = z.object({
  id: z.string().uuid().optional(),
  music_request: z.string().optional().nullable(),
  registrant_id: z.string(),
  assosciation: z.string().optional().nullable(),
  eventId: z.string()
}).strict();

export const RegistrationUpdateWithoutVesselInputSchema: z.ZodType<Prisma.RegistrationUpdateWithoutVesselInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrant: z.lazy(() => RegistrantUpdateOneRequiredWithoutRegistrationNestedInputSchema).optional(),
  participants: z.lazy(() => ParticipantUpdateManyWithoutRegistrationNestedInputSchema).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutRegistrationsNestedInputSchema).optional()
}).strict();

export const RegistrationUncheckedUpdateWithoutVesselInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateWithoutVesselInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  participants: z.lazy(() => ParticipantUncheckedUpdateManyWithoutRegistrationNestedInputSchema).optional()
}).strict();

export const RegistrationUncheckedUpdateManyWithoutVesselInputSchema: z.ZodType<Prisma.RegistrationUncheckedUpdateManyWithoutVesselInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  music_request: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registrant_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assosciation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const EventFindFirstArgsSchema: z.ZodType<Prisma.EventFindFirstArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventFindFirstOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindManyArgsSchema: z.ZodType<Prisma.EventFindManyArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventAggregateArgsSchema: z.ZodType<Prisma.EventAggregateArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventGroupByArgsSchema: z.ZodType<Prisma.EventGroupByArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithAggregationInputSchema.array(),EventOrderByWithAggregationInputSchema ]).optional(),
  by: EventScalarFieldEnumSchema.array(),
  having: EventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventFindUniqueArgsSchema: z.ZodType<Prisma.EventFindUniqueArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventFindUniqueOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const ParticipantFindFirstArgsSchema: z.ZodType<Prisma.ParticipantFindFirstArgs> = z.object({
  select: ParticipantSelectSchema.optional(),
  include: ParticipantIncludeSchema.optional(),
  where: ParticipantWhereInputSchema.optional(),
  orderBy: z.union([ ParticipantOrderByWithRelationInputSchema.array(),ParticipantOrderByWithRelationInputSchema ]).optional(),
  cursor: ParticipantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ParticipantScalarFieldEnumSchema,ParticipantScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ParticipantFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ParticipantFindFirstOrThrowArgs> = z.object({
  select: ParticipantSelectSchema.optional(),
  include: ParticipantIncludeSchema.optional(),
  where: ParticipantWhereInputSchema.optional(),
  orderBy: z.union([ ParticipantOrderByWithRelationInputSchema.array(),ParticipantOrderByWithRelationInputSchema ]).optional(),
  cursor: ParticipantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ParticipantScalarFieldEnumSchema,ParticipantScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ParticipantFindManyArgsSchema: z.ZodType<Prisma.ParticipantFindManyArgs> = z.object({
  select: ParticipantSelectSchema.optional(),
  include: ParticipantIncludeSchema.optional(),
  where: ParticipantWhereInputSchema.optional(),
  orderBy: z.union([ ParticipantOrderByWithRelationInputSchema.array(),ParticipantOrderByWithRelationInputSchema ]).optional(),
  cursor: ParticipantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ParticipantScalarFieldEnumSchema,ParticipantScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ParticipantAggregateArgsSchema: z.ZodType<Prisma.ParticipantAggregateArgs> = z.object({
  where: ParticipantWhereInputSchema.optional(),
  orderBy: z.union([ ParticipantOrderByWithRelationInputSchema.array(),ParticipantOrderByWithRelationInputSchema ]).optional(),
  cursor: ParticipantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ParticipantGroupByArgsSchema: z.ZodType<Prisma.ParticipantGroupByArgs> = z.object({
  where: ParticipantWhereInputSchema.optional(),
  orderBy: z.union([ ParticipantOrderByWithAggregationInputSchema.array(),ParticipantOrderByWithAggregationInputSchema ]).optional(),
  by: ParticipantScalarFieldEnumSchema.array(),
  having: ParticipantScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ParticipantFindUniqueArgsSchema: z.ZodType<Prisma.ParticipantFindUniqueArgs> = z.object({
  select: ParticipantSelectSchema.optional(),
  include: ParticipantIncludeSchema.optional(),
  where: ParticipantWhereUniqueInputSchema,
}).strict() ;

export const ParticipantFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ParticipantFindUniqueOrThrowArgs> = z.object({
  select: ParticipantSelectSchema.optional(),
  include: ParticipantIncludeSchema.optional(),
  where: ParticipantWhereUniqueInputSchema,
}).strict() ;

export const RegistrantFindFirstArgsSchema: z.ZodType<Prisma.RegistrantFindFirstArgs> = z.object({
  select: RegistrantSelectSchema.optional(),
  include: RegistrantIncludeSchema.optional(),
  where: RegistrantWhereInputSchema.optional(),
  orderBy: z.union([ RegistrantOrderByWithRelationInputSchema.array(),RegistrantOrderByWithRelationInputSchema ]).optional(),
  cursor: RegistrantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegistrantScalarFieldEnumSchema,RegistrantScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RegistrantFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RegistrantFindFirstOrThrowArgs> = z.object({
  select: RegistrantSelectSchema.optional(),
  include: RegistrantIncludeSchema.optional(),
  where: RegistrantWhereInputSchema.optional(),
  orderBy: z.union([ RegistrantOrderByWithRelationInputSchema.array(),RegistrantOrderByWithRelationInputSchema ]).optional(),
  cursor: RegistrantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegistrantScalarFieldEnumSchema,RegistrantScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RegistrantFindManyArgsSchema: z.ZodType<Prisma.RegistrantFindManyArgs> = z.object({
  select: RegistrantSelectSchema.optional(),
  include: RegistrantIncludeSchema.optional(),
  where: RegistrantWhereInputSchema.optional(),
  orderBy: z.union([ RegistrantOrderByWithRelationInputSchema.array(),RegistrantOrderByWithRelationInputSchema ]).optional(),
  cursor: RegistrantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegistrantScalarFieldEnumSchema,RegistrantScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RegistrantAggregateArgsSchema: z.ZodType<Prisma.RegistrantAggregateArgs> = z.object({
  where: RegistrantWhereInputSchema.optional(),
  orderBy: z.union([ RegistrantOrderByWithRelationInputSchema.array(),RegistrantOrderByWithRelationInputSchema ]).optional(),
  cursor: RegistrantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RegistrantGroupByArgsSchema: z.ZodType<Prisma.RegistrantGroupByArgs> = z.object({
  where: RegistrantWhereInputSchema.optional(),
  orderBy: z.union([ RegistrantOrderByWithAggregationInputSchema.array(),RegistrantOrderByWithAggregationInputSchema ]).optional(),
  by: RegistrantScalarFieldEnumSchema.array(),
  having: RegistrantScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RegistrantFindUniqueArgsSchema: z.ZodType<Prisma.RegistrantFindUniqueArgs> = z.object({
  select: RegistrantSelectSchema.optional(),
  include: RegistrantIncludeSchema.optional(),
  where: RegistrantWhereUniqueInputSchema,
}).strict() ;

export const RegistrantFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RegistrantFindUniqueOrThrowArgs> = z.object({
  select: RegistrantSelectSchema.optional(),
  include: RegistrantIncludeSchema.optional(),
  where: RegistrantWhereUniqueInputSchema,
}).strict() ;

export const RegistrationFindFirstArgsSchema: z.ZodType<Prisma.RegistrationFindFirstArgs> = z.object({
  select: RegistrationSelectSchema.optional(),
  include: RegistrationIncludeSchema.optional(),
  where: RegistrationWhereInputSchema.optional(),
  orderBy: z.union([ RegistrationOrderByWithRelationInputSchema.array(),RegistrationOrderByWithRelationInputSchema ]).optional(),
  cursor: RegistrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegistrationScalarFieldEnumSchema,RegistrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RegistrationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RegistrationFindFirstOrThrowArgs> = z.object({
  select: RegistrationSelectSchema.optional(),
  include: RegistrationIncludeSchema.optional(),
  where: RegistrationWhereInputSchema.optional(),
  orderBy: z.union([ RegistrationOrderByWithRelationInputSchema.array(),RegistrationOrderByWithRelationInputSchema ]).optional(),
  cursor: RegistrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegistrationScalarFieldEnumSchema,RegistrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RegistrationFindManyArgsSchema: z.ZodType<Prisma.RegistrationFindManyArgs> = z.object({
  select: RegistrationSelectSchema.optional(),
  include: RegistrationIncludeSchema.optional(),
  where: RegistrationWhereInputSchema.optional(),
  orderBy: z.union([ RegistrationOrderByWithRelationInputSchema.array(),RegistrationOrderByWithRelationInputSchema ]).optional(),
  cursor: RegistrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegistrationScalarFieldEnumSchema,RegistrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RegistrationAggregateArgsSchema: z.ZodType<Prisma.RegistrationAggregateArgs> = z.object({
  where: RegistrationWhereInputSchema.optional(),
  orderBy: z.union([ RegistrationOrderByWithRelationInputSchema.array(),RegistrationOrderByWithRelationInputSchema ]).optional(),
  cursor: RegistrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RegistrationGroupByArgsSchema: z.ZodType<Prisma.RegistrationGroupByArgs> = z.object({
  where: RegistrationWhereInputSchema.optional(),
  orderBy: z.union([ RegistrationOrderByWithAggregationInputSchema.array(),RegistrationOrderByWithAggregationInputSchema ]).optional(),
  by: RegistrationScalarFieldEnumSchema.array(),
  having: RegistrationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RegistrationFindUniqueArgsSchema: z.ZodType<Prisma.RegistrationFindUniqueArgs> = z.object({
  select: RegistrationSelectSchema.optional(),
  include: RegistrationIncludeSchema.optional(),
  where: RegistrationWhereUniqueInputSchema,
}).strict() ;

export const RegistrationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RegistrationFindUniqueOrThrowArgs> = z.object({
  select: RegistrationSelectSchema.optional(),
  include: RegistrationIncludeSchema.optional(),
  where: RegistrationWhereUniqueInputSchema,
}).strict() ;

export const VesselTypeFindFirstArgsSchema: z.ZodType<Prisma.VesselTypeFindFirstArgs> = z.object({
  select: VesselTypeSelectSchema.optional(),
  include: VesselTypeIncludeSchema.optional(),
  where: VesselTypeWhereInputSchema.optional(),
  orderBy: z.union([ VesselTypeOrderByWithRelationInputSchema.array(),VesselTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: VesselTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VesselTypeScalarFieldEnumSchema,VesselTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VesselTypeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VesselTypeFindFirstOrThrowArgs> = z.object({
  select: VesselTypeSelectSchema.optional(),
  include: VesselTypeIncludeSchema.optional(),
  where: VesselTypeWhereInputSchema.optional(),
  orderBy: z.union([ VesselTypeOrderByWithRelationInputSchema.array(),VesselTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: VesselTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VesselTypeScalarFieldEnumSchema,VesselTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VesselTypeFindManyArgsSchema: z.ZodType<Prisma.VesselTypeFindManyArgs> = z.object({
  select: VesselTypeSelectSchema.optional(),
  include: VesselTypeIncludeSchema.optional(),
  where: VesselTypeWhereInputSchema.optional(),
  orderBy: z.union([ VesselTypeOrderByWithRelationInputSchema.array(),VesselTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: VesselTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VesselTypeScalarFieldEnumSchema,VesselTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VesselTypeAggregateArgsSchema: z.ZodType<Prisma.VesselTypeAggregateArgs> = z.object({
  where: VesselTypeWhereInputSchema.optional(),
  orderBy: z.union([ VesselTypeOrderByWithRelationInputSchema.array(),VesselTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: VesselTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VesselTypeGroupByArgsSchema: z.ZodType<Prisma.VesselTypeGroupByArgs> = z.object({
  where: VesselTypeWhereInputSchema.optional(),
  orderBy: z.union([ VesselTypeOrderByWithAggregationInputSchema.array(),VesselTypeOrderByWithAggregationInputSchema ]).optional(),
  by: VesselTypeScalarFieldEnumSchema.array(),
  having: VesselTypeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VesselTypeFindUniqueArgsSchema: z.ZodType<Prisma.VesselTypeFindUniqueArgs> = z.object({
  select: VesselTypeSelectSchema.optional(),
  include: VesselTypeIncludeSchema.optional(),
  where: VesselTypeWhereUniqueInputSchema,
}).strict() ;

export const VesselTypeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VesselTypeFindUniqueOrThrowArgs> = z.object({
  select: VesselTypeSelectSchema.optional(),
  include: VesselTypeIncludeSchema.optional(),
  where: VesselTypeWhereUniqueInputSchema,
}).strict() ;

export const VesselFindFirstArgsSchema: z.ZodType<Prisma.VesselFindFirstArgs> = z.object({
  select: VesselSelectSchema.optional(),
  include: VesselIncludeSchema.optional(),
  where: VesselWhereInputSchema.optional(),
  orderBy: z.union([ VesselOrderByWithRelationInputSchema.array(),VesselOrderByWithRelationInputSchema ]).optional(),
  cursor: VesselWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VesselScalarFieldEnumSchema,VesselScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VesselFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VesselFindFirstOrThrowArgs> = z.object({
  select: VesselSelectSchema.optional(),
  include: VesselIncludeSchema.optional(),
  where: VesselWhereInputSchema.optional(),
  orderBy: z.union([ VesselOrderByWithRelationInputSchema.array(),VesselOrderByWithRelationInputSchema ]).optional(),
  cursor: VesselWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VesselScalarFieldEnumSchema,VesselScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VesselFindManyArgsSchema: z.ZodType<Prisma.VesselFindManyArgs> = z.object({
  select: VesselSelectSchema.optional(),
  include: VesselIncludeSchema.optional(),
  where: VesselWhereInputSchema.optional(),
  orderBy: z.union([ VesselOrderByWithRelationInputSchema.array(),VesselOrderByWithRelationInputSchema ]).optional(),
  cursor: VesselWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VesselScalarFieldEnumSchema,VesselScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VesselAggregateArgsSchema: z.ZodType<Prisma.VesselAggregateArgs> = z.object({
  where: VesselWhereInputSchema.optional(),
  orderBy: z.union([ VesselOrderByWithRelationInputSchema.array(),VesselOrderByWithRelationInputSchema ]).optional(),
  cursor: VesselWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VesselGroupByArgsSchema: z.ZodType<Prisma.VesselGroupByArgs> = z.object({
  where: VesselWhereInputSchema.optional(),
  orderBy: z.union([ VesselOrderByWithAggregationInputSchema.array(),VesselOrderByWithAggregationInputSchema ]).optional(),
  by: VesselScalarFieldEnumSchema.array(),
  having: VesselScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VesselFindUniqueArgsSchema: z.ZodType<Prisma.VesselFindUniqueArgs> = z.object({
  select: VesselSelectSchema.optional(),
  include: VesselIncludeSchema.optional(),
  where: VesselWhereUniqueInputSchema,
}).strict() ;

export const VesselFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VesselFindUniqueOrThrowArgs> = z.object({
  select: VesselSelectSchema.optional(),
  include: VesselIncludeSchema.optional(),
  where: VesselWhereUniqueInputSchema,
}).strict() ;

export const EventCreateArgsSchema: z.ZodType<Prisma.EventCreateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
}).strict() ;

export const EventUpsertArgsSchema: z.ZodType<Prisma.EventUpsertArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
  create: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
  update: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventCreateManyArgsSchema: z.ZodType<Prisma.EventCreateManyArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventDeleteArgsSchema: z.ZodType<Prisma.EventDeleteArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateArgsSchema: z.ZodType<Prisma.EventUpdateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateManyArgsSchema: z.ZodType<Prisma.EventUpdateManyArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const EventDeleteManyArgsSchema: z.ZodType<Prisma.EventDeleteManyArgs> = z.object({
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const ParticipantCreateArgsSchema: z.ZodType<Prisma.ParticipantCreateArgs> = z.object({
  select: ParticipantSelectSchema.optional(),
  include: ParticipantIncludeSchema.optional(),
  data: z.union([ ParticipantCreateInputSchema,ParticipantUncheckedCreateInputSchema ]),
}).strict() ;

export const ParticipantUpsertArgsSchema: z.ZodType<Prisma.ParticipantUpsertArgs> = z.object({
  select: ParticipantSelectSchema.optional(),
  include: ParticipantIncludeSchema.optional(),
  where: ParticipantWhereUniqueInputSchema,
  create: z.union([ ParticipantCreateInputSchema,ParticipantUncheckedCreateInputSchema ]),
  update: z.union([ ParticipantUpdateInputSchema,ParticipantUncheckedUpdateInputSchema ]),
}).strict() ;

export const ParticipantCreateManyArgsSchema: z.ZodType<Prisma.ParticipantCreateManyArgs> = z.object({
  data: z.union([ ParticipantCreateManyInputSchema,ParticipantCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ParticipantDeleteArgsSchema: z.ZodType<Prisma.ParticipantDeleteArgs> = z.object({
  select: ParticipantSelectSchema.optional(),
  include: ParticipantIncludeSchema.optional(),
  where: ParticipantWhereUniqueInputSchema,
}).strict() ;

export const ParticipantUpdateArgsSchema: z.ZodType<Prisma.ParticipantUpdateArgs> = z.object({
  select: ParticipantSelectSchema.optional(),
  include: ParticipantIncludeSchema.optional(),
  data: z.union([ ParticipantUpdateInputSchema,ParticipantUncheckedUpdateInputSchema ]),
  where: ParticipantWhereUniqueInputSchema,
}).strict() ;

export const ParticipantUpdateManyArgsSchema: z.ZodType<Prisma.ParticipantUpdateManyArgs> = z.object({
  data: z.union([ ParticipantUpdateManyMutationInputSchema,ParticipantUncheckedUpdateManyInputSchema ]),
  where: ParticipantWhereInputSchema.optional(),
}).strict() ;

export const ParticipantDeleteManyArgsSchema: z.ZodType<Prisma.ParticipantDeleteManyArgs> = z.object({
  where: ParticipantWhereInputSchema.optional(),
}).strict() ;

export const RegistrantCreateArgsSchema: z.ZodType<Prisma.RegistrantCreateArgs> = z.object({
  select: RegistrantSelectSchema.optional(),
  include: RegistrantIncludeSchema.optional(),
  data: z.union([ RegistrantCreateInputSchema,RegistrantUncheckedCreateInputSchema ]),
}).strict() ;

export const RegistrantUpsertArgsSchema: z.ZodType<Prisma.RegistrantUpsertArgs> = z.object({
  select: RegistrantSelectSchema.optional(),
  include: RegistrantIncludeSchema.optional(),
  where: RegistrantWhereUniqueInputSchema,
  create: z.union([ RegistrantCreateInputSchema,RegistrantUncheckedCreateInputSchema ]),
  update: z.union([ RegistrantUpdateInputSchema,RegistrantUncheckedUpdateInputSchema ]),
}).strict() ;

export const RegistrantCreateManyArgsSchema: z.ZodType<Prisma.RegistrantCreateManyArgs> = z.object({
  data: z.union([ RegistrantCreateManyInputSchema,RegistrantCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RegistrantDeleteArgsSchema: z.ZodType<Prisma.RegistrantDeleteArgs> = z.object({
  select: RegistrantSelectSchema.optional(),
  include: RegistrantIncludeSchema.optional(),
  where: RegistrantWhereUniqueInputSchema,
}).strict() ;

export const RegistrantUpdateArgsSchema: z.ZodType<Prisma.RegistrantUpdateArgs> = z.object({
  select: RegistrantSelectSchema.optional(),
  include: RegistrantIncludeSchema.optional(),
  data: z.union([ RegistrantUpdateInputSchema,RegistrantUncheckedUpdateInputSchema ]),
  where: RegistrantWhereUniqueInputSchema,
}).strict() ;

export const RegistrantUpdateManyArgsSchema: z.ZodType<Prisma.RegistrantUpdateManyArgs> = z.object({
  data: z.union([ RegistrantUpdateManyMutationInputSchema,RegistrantUncheckedUpdateManyInputSchema ]),
  where: RegistrantWhereInputSchema.optional(),
}).strict() ;

export const RegistrantDeleteManyArgsSchema: z.ZodType<Prisma.RegistrantDeleteManyArgs> = z.object({
  where: RegistrantWhereInputSchema.optional(),
}).strict() ;

export const RegistrationCreateArgsSchema: z.ZodType<Prisma.RegistrationCreateArgs> = z.object({
  select: RegistrationSelectSchema.optional(),
  include: RegistrationIncludeSchema.optional(),
  data: z.union([ RegistrationCreateInputSchema,RegistrationUncheckedCreateInputSchema ]),
}).strict() ;

export const RegistrationUpsertArgsSchema: z.ZodType<Prisma.RegistrationUpsertArgs> = z.object({
  select: RegistrationSelectSchema.optional(),
  include: RegistrationIncludeSchema.optional(),
  where: RegistrationWhereUniqueInputSchema,
  create: z.union([ RegistrationCreateInputSchema,RegistrationUncheckedCreateInputSchema ]),
  update: z.union([ RegistrationUpdateInputSchema,RegistrationUncheckedUpdateInputSchema ]),
}).strict() ;

export const RegistrationCreateManyArgsSchema: z.ZodType<Prisma.RegistrationCreateManyArgs> = z.object({
  data: z.union([ RegistrationCreateManyInputSchema,RegistrationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RegistrationDeleteArgsSchema: z.ZodType<Prisma.RegistrationDeleteArgs> = z.object({
  select: RegistrationSelectSchema.optional(),
  include: RegistrationIncludeSchema.optional(),
  where: RegistrationWhereUniqueInputSchema,
}).strict() ;

export const RegistrationUpdateArgsSchema: z.ZodType<Prisma.RegistrationUpdateArgs> = z.object({
  select: RegistrationSelectSchema.optional(),
  include: RegistrationIncludeSchema.optional(),
  data: z.union([ RegistrationUpdateInputSchema,RegistrationUncheckedUpdateInputSchema ]),
  where: RegistrationWhereUniqueInputSchema,
}).strict() ;

export const RegistrationUpdateManyArgsSchema: z.ZodType<Prisma.RegistrationUpdateManyArgs> = z.object({
  data: z.union([ RegistrationUpdateManyMutationInputSchema,RegistrationUncheckedUpdateManyInputSchema ]),
  where: RegistrationWhereInputSchema.optional(),
}).strict() ;

export const RegistrationDeleteManyArgsSchema: z.ZodType<Prisma.RegistrationDeleteManyArgs> = z.object({
  where: RegistrationWhereInputSchema.optional(),
}).strict() ;

export const VesselTypeCreateArgsSchema: z.ZodType<Prisma.VesselTypeCreateArgs> = z.object({
  select: VesselTypeSelectSchema.optional(),
  include: VesselTypeIncludeSchema.optional(),
  data: z.union([ VesselTypeCreateInputSchema,VesselTypeUncheckedCreateInputSchema ]),
}).strict() ;

export const VesselTypeUpsertArgsSchema: z.ZodType<Prisma.VesselTypeUpsertArgs> = z.object({
  select: VesselTypeSelectSchema.optional(),
  include: VesselTypeIncludeSchema.optional(),
  where: VesselTypeWhereUniqueInputSchema,
  create: z.union([ VesselTypeCreateInputSchema,VesselTypeUncheckedCreateInputSchema ]),
  update: z.union([ VesselTypeUpdateInputSchema,VesselTypeUncheckedUpdateInputSchema ]),
}).strict() ;

export const VesselTypeCreateManyArgsSchema: z.ZodType<Prisma.VesselTypeCreateManyArgs> = z.object({
  data: z.union([ VesselTypeCreateManyInputSchema,VesselTypeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VesselTypeDeleteArgsSchema: z.ZodType<Prisma.VesselTypeDeleteArgs> = z.object({
  select: VesselTypeSelectSchema.optional(),
  include: VesselTypeIncludeSchema.optional(),
  where: VesselTypeWhereUniqueInputSchema,
}).strict() ;

export const VesselTypeUpdateArgsSchema: z.ZodType<Prisma.VesselTypeUpdateArgs> = z.object({
  select: VesselTypeSelectSchema.optional(),
  include: VesselTypeIncludeSchema.optional(),
  data: z.union([ VesselTypeUpdateInputSchema,VesselTypeUncheckedUpdateInputSchema ]),
  where: VesselTypeWhereUniqueInputSchema,
}).strict() ;

export const VesselTypeUpdateManyArgsSchema: z.ZodType<Prisma.VesselTypeUpdateManyArgs> = z.object({
  data: z.union([ VesselTypeUpdateManyMutationInputSchema,VesselTypeUncheckedUpdateManyInputSchema ]),
  where: VesselTypeWhereInputSchema.optional(),
}).strict() ;

export const VesselTypeDeleteManyArgsSchema: z.ZodType<Prisma.VesselTypeDeleteManyArgs> = z.object({
  where: VesselTypeWhereInputSchema.optional(),
}).strict() ;

export const VesselCreateArgsSchema: z.ZodType<Prisma.VesselCreateArgs> = z.object({
  select: VesselSelectSchema.optional(),
  include: VesselIncludeSchema.optional(),
  data: z.union([ VesselCreateInputSchema,VesselUncheckedCreateInputSchema ]),
}).strict() ;

export const VesselUpsertArgsSchema: z.ZodType<Prisma.VesselUpsertArgs> = z.object({
  select: VesselSelectSchema.optional(),
  include: VesselIncludeSchema.optional(),
  where: VesselWhereUniqueInputSchema,
  create: z.union([ VesselCreateInputSchema,VesselUncheckedCreateInputSchema ]),
  update: z.union([ VesselUpdateInputSchema,VesselUncheckedUpdateInputSchema ]),
}).strict() ;

export const VesselCreateManyArgsSchema: z.ZodType<Prisma.VesselCreateManyArgs> = z.object({
  data: z.union([ VesselCreateManyInputSchema,VesselCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VesselDeleteArgsSchema: z.ZodType<Prisma.VesselDeleteArgs> = z.object({
  select: VesselSelectSchema.optional(),
  include: VesselIncludeSchema.optional(),
  where: VesselWhereUniqueInputSchema,
}).strict() ;

export const VesselUpdateArgsSchema: z.ZodType<Prisma.VesselUpdateArgs> = z.object({
  select: VesselSelectSchema.optional(),
  include: VesselIncludeSchema.optional(),
  data: z.union([ VesselUpdateInputSchema,VesselUncheckedUpdateInputSchema ]),
  where: VesselWhereUniqueInputSchema,
}).strict() ;

export const VesselUpdateManyArgsSchema: z.ZodType<Prisma.VesselUpdateManyArgs> = z.object({
  data: z.union([ VesselUpdateManyMutationInputSchema,VesselUncheckedUpdateManyInputSchema ]),
  where: VesselWhereInputSchema.optional(),
}).strict() ;

export const VesselDeleteManyArgsSchema: z.ZodType<Prisma.VesselDeleteManyArgs> = z.object({
  where: VesselWhereInputSchema.optional(),
}).strict() ;