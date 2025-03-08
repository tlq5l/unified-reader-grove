import * as React from "react"
import { FormProvider } from "react-hook-form"
import { type FieldPath, type FieldValues } from "react-hook-form"

// Export the Form component
export const Form = FormProvider

// Export context types and contexts
export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

export type FormItemContextValue = {
  id: string
}

export const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)