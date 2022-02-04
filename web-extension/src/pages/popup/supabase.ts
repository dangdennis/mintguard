import { createClient } from '@supabase/supabase-js'

// These aren't secrets.
export const supabase = createClient(
  'https://elmpmgajzaknfjhfrgzt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzYxNDMxMCwiZXhwIjoxOTQzMTkwMzEwfQ.R32Jrt3vkOP1biOh2Cnf3Zt81U3bzEyBxQZZC_jWj6E',
)
