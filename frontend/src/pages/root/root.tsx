import { Header } from '@/components/layout/header';
import { SchoolYear } from '@/components/students/SchoolYear';
import { ThemeProvider } from '@/components/theme-provider';
function Root() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-6">
          <SchoolYear />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default Root;