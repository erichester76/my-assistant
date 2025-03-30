// src/app/page.tsx
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Import the Supabase client

export default async function HomePage() {

  const { data: userResponse } = await supabase.auth.getUser(); // Get the authenticated user
  const user = userResponse?.user; // Extract the user object

  // Check if the user has completed setup by querying connected services
  const { data: tokens } = await supabase
    .from('user_tokens') // Table storing connected services
    .select('service')
    .eq('user_id', user?.id);

  // Extract connected services; default to empty array if no tokens exist
  const connectedServices = tokens ? tokens.map(t => t.service) : [];

  // Define the services required for setup completion
  const requiredServices = ['google', 'office365', 'slack'];

  // Check if all required services are connected
  const isSetupComplete = requiredServices.every(service =>
    connectedServices.includes(service)
  );

  if (!isSetupComplete) {
    // Redirect to setup wizard if setup is incomplete
    redirect('/setup');
  }

  // Redirect to inbox if authenticated and setup is complete
  redirect('/inbox');
}