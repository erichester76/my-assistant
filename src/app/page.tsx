// src/app/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  // Initialize Supabase client with cookies for server-side authentication
  const supabase = createServerComponentClient({ cookies });

  // Check if the user is authenticated
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to login page if user is not authenticated
    redirect('/login');
  }

  // Check if the user has completed setup by querying connected services
  const { data: tokens } = await supabase
    .from('user_tokens') // Table storing connected services
    .select('service')
    .eq('user_id', user.id);

  // Extract connected services; default to empty array if no tokens exist
  const connectedServices = tokens ? tokens.map(t => t.service) : [];

  // Define the services required for setup completion
  const requiredServices = ['gmail', 'office365', 'slack'];

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