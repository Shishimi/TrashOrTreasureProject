
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://fdzsbhvpcdmsnjitqudi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkenNiaHZwY2Rtc25qaXRxdWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzExMTgsImV4cCI6MjA2MDQwNzExOH0.nPmzqfZQKSqteiq2waJoJVneFmh1tvrZ6eODMCZVuLw'
export const supabase = createClient(supabaseUrl, supabaseKey)