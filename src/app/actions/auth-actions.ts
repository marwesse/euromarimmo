'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Quick validation
    if (!email || !password) {
        return { error: 'Veuillez remplir tous les champs' }
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: 'Identifiants incorrects' }
    }

    revalidatePath('/', 'layout')
    redirect('/admin')
}

export async function signOut() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        return { error: 'Erreur lors de la déconnexion' }
    }

    revalidatePath('/', 'layout')
    redirect('/admin/login')
}
