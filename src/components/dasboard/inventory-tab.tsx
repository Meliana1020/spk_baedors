"use client";

import { useInventory } from "@/hooks/useInventory";
import { Plus, XCircle } from "lucide-react";
import { Card, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InventoryFormHeader from "../fragments/dashboard/inventory/header";
import AutocompleteList from "../fragments/dashboard/inventory/auto-complatelist";
import InventoryTable from "../fragments/dashboard/inventory/table";
import InventoryForm from "../fragments/dashboard/inventory/form";

export default function InventoryTab() {
  const {
    dailyLogs, loading, isEditing, form, setForm,
    showSuggestions, setShowSuggestions, filteredProducts,
    handleNameChange, handleSave, handleDelete, startEdit, resetForm
  } = useInventory();

  return (
    <div className="space-y-6 animate-fade-in">
      <InventoryForm
        isEditing={!!isEditing}
        form={form}
        setForm={setForm}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        filteredProducts={filteredProducts}
        handleNameChange={handleNameChange}
        handleSave={handleSave}
        resetForm={resetForm}
      />

      <InventoryTable 
        loading={loading} 
        logs={dailyLogs} 
        onEdit={startEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}