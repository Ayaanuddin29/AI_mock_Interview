import { serial, varchar, timestamp, text, pgTable, integer } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),  
    jobPosition: varchar('jobPosition', { length: 300 }).notNull(),
    jobDesc: varchar('jobDesc', { length: 500 }).notNull(),
    jobExperience: varchar('jobExperience', { length: 36 }).notNull(),
    createdBy: varchar('createdBy', { length: 36 }).notNull(),
    createdAt: varchar('createdAt', { length: 36 }),  
    mockId: varchar('mockId', { length: 36 }).notNull()
});

export const UserAnswere = pgTable('user_answere', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mock_id', { length: 36 }).notNull(),
    question: varchar('question', { length: 500 }).notNull(),
    correctAns: text('correct_ans', { length: 500 }),
    userAns: text('user_ans'),  // Removed invalid length property
    feedback: text('feedback'), // Removed invalid length property
    rating: varchar('rating'),  // Changed to integer instead of varchar
    userEmail: varchar('user_email'), // Email length can be 255
    createdAt: varchar('createdAt')
});