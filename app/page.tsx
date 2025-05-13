import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { DataGrid } from "@/registry/new-york/blocks/DataGrid/DataGrid"
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form"
import PokemonPage from "@/registry/new-york/blocks/complex-component/page"
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card"
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col gap-8">
      </main>
    </div>
  )
}
