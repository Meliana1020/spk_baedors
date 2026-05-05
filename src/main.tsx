import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createRootRoute, 
  createRoute, 
  createRouter, 
  RouterProvider, 
  Outlet 
} from '@tanstack/react-router'
import { ThemeProvider } from "@/lib/theme"; 
import * as LoginModule from './routes/login'
import { DashboardPage } from './routes/dashboard'
import './styles.css'

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider>
      <div className="dark min-h-screen bg-[#0b0f1a] text-white">
        <Outlet />
      </div>
    </ThemeProvider>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LoginModule.LoginPage,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
})

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}