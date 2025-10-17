'use client'
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useZodForm({
  schema,
  defaultValues,
  mode = "onSubmit",
  reValidateMode = "onChange",
}) {
  const resolver = useMemo(() => zodResolver(schema), [schema]);
  return useForm({ resolver, mode, reValidateMode, defaultValues });
}