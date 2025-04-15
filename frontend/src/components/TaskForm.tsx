import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { ITask } from "../types";
import Toast from "../utils/Toast";

const schema = yup.object({
  title: yup.string().required("El título es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
  completed: yup.boolean().default(false),
});

type TaskSchemaType = InferType<typeof schema>;

interface Props {
  onSubmit: (data: ITask) => Promise<void>;
  defaultValues?: ITask;
}

const TaskForm: React.FC<Props> = ({ onSubmit, defaultValues }) => {
  const [showToast, setShowToast] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskSchemaType>({
    resolver: yupResolver(schema),
    defaultValues: {
      completed: false,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: TaskSchemaType) => {
    const fullData: ITask = {
      ...defaultValues,
      ...data,
    };
    await onSubmit(fullData);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);

    if (!defaultValues) {
      reset({ title: "", description: "", completed: false });
    }
  };

  return (
    <>
      {showToast && <Toast message="¡Tarea guardada correctamente!" />}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white p-4 rounded-xl shadow-md space-y-4 w-full max-w-md"
      >
        <div>
          <label className="block font-medium text-sm">Título</label>
          <input
            {...register("title")}
            className="w-full border rounded-md px-3 py-2 mt-1"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm">Descripción</label>
          <textarea
            {...register("description")}
            className="w-full border rounded-md px-3 py-2 mt-1"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {defaultValues ? "Actualizar" : "Crear"}
        </button>
      </form>
    </>
  );
};

export default TaskForm;
