# candidates_db.assessments_summary

Source: `AdminBackend/schemas/candidates_schema.sql`. Use this when writing queries in CandidateBackend so column names match the DB.

## Table: `candidates_db.assessments_summary`

| Column                    | Type         | Nullable |
|---------------------------|--------------|----------|
| id                        | BINARY(16)   | PK       |
| candidate_id              | BINARY(16)   | NOT NULL |
| position_id               | BINARY(16)   | NOT NULL |
| question_id               | BINARY(16)   | NOT NULL |
| assessment_start_time     | VARCHAR(255) | YES      |
| assessment_end_time       | VARCHAR(255) | YES      |
| is_assessment_completed   | BIT(1)       | YES      |
| is_report_generated       | BIT(1)       | YES      |
| round1_assigned           | BIT(1)       | YES      |
| round1_completed          | BIT(1)       | YES      |
| round1_start_time         | VARCHAR(255) | YES      |
| round1_end_time           | VARCHAR(255) | YES      |
| round1_time_taken         | VARCHAR(255) | YES      |
| round2_assigned           | BIT(1)       | YES      |
| round2_completed          | BIT(1)       | YES      |
| round2_start_time         | VARCHAR(255) | YES      |
| round2_end_time           | VARCHAR(255) | YES      |
| round2_time_taken         | VARCHAR(255) | YES      |
| round3_assigned           | BIT(1)       | YES      |
| round3_completed          | BIT(1)       | YES      |
| round3_start_time         | VARCHAR(255) | YES      |
| round3_end_time           | VARCHAR(255) | YES      |
| round3_time_taken         | VARCHAR(255) | YES      |
| round4_assigned           | BIT(1)       | YES      |
| round4_completed          | BIT(1)       | YES      |
| round4_start_time         | VARCHAR(255) | YES      |
| round4_end_time           | VARCHAR(255) | YES      |
| round4_time_taken         | VARCHAR(255) | YES      |
| created_at                | DATETIME(6)  | NOT NULL |

## Columns NOT in this table

- `total_rounds_assigned`
- `total_rounds_completed`
- `total_interview_time`
- `updated_at`

Do not use these in SELECT/INSERT/UPDATE. API responses can still expose `totalRoundsAssigned`, `totalInterviewTime` etc. as computed/default values in JSON.
