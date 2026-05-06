"use client";

import { Plus, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InventoryFormHeader from "./header";
import AutocompleteList from "./complete-list";

interface InventoryFormProps {
  isEditing: boolean;
  form: any;
  setForm: (form: any) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  filteredProducts: string[];
  handleNameChange: (value: string) => void;
  handleSave: () => void;
  resetForm: () => void;
}

export default function InventoryForm({
  isEditing,
  form,
  setForm,
  showSuggestions,
  setShowSuggestions,
  filteredProducts,
  handleNameChange,
  handleSave,
  resetForm,
}: InventoryFormProps) {
  return (
    <Card className="glass border-none relative">
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 blur-3xl rounded-full" />
      <CardContent className="p-7 relative">
        <InventoryFormHeader isEditing={isEditing} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Input Nama Produk + Autocomplete */}
          <div className="relative">
            <Input
              placeholder="Nama Produk"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              onFocus={() => form.name && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="bg-white/5 border-white/10 py-6"
            />
            <AutocompleteList
              show={showSuggestions}
              items={filteredProducts}
              onSelect={(p) => handleNameChange(p)}
            />
          </div>

          {/* Input Jumlah */}
          <Input
            type="number"
            placeholder="Jumlah"
            value={form.qty || ""}
            onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })}
            className="bg-white/5 border-white/10 py-6"
          />

          {/* Input Tanggal */}
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="bg-white/5 border-white/10 py-6"
          />

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className={`flex-1 py-6 font-black shadow-lg transition-all active:scale-95 ${
                isEditing ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              <Plus size={16} className="mr-2" />
              {isEditing ? "UPDATE" : "SIMPAN"}
            </Button>

            {isEditing && (
              <Button
                variant="ghost"
                onClick={resetForm}
                className="py-6 bg-white/10 hover:bg-white/20 text-white"
              >
                <XCircle size={18} />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
