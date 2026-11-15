// Cliente modular de base de datos
// Si las variables de entorno de Supabase están configuradas, se conecta a la nube;
// de lo contrario, la aplicación opera de forma autónoma con almacenamiento local offline.

export const isSupabaseConfigured = () => {
  return (
    typeof process !== "undefined" &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
};
