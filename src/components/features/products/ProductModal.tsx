import { useSnapshot } from "valtio";
import { useState } from "react";
import { ProductStore } from "../../../stores/productStore";
import { useProducts } from "../../../hooks/useProducts";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import FormField from "../../ui/FormField";
import FormGrid from "../../ui/FormGrid";
import AlertMessage from "../../ui/AlertMessage";
import type { Product } from "../../../stores/types/product";
import { useTranslation } from "../../../hooks/useTranslation";
import { productSchema } from "../../../schemas/productSchema";
import { ZodError } from "zod";

type ProductModalProps = {
  product?: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { t } = useTranslation();
  const { addProduct, updateProduct } = useProducts();
  const productState = useSnapshot(ProductStore);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const isEdit = !!product;

  const handleSubmit = async (formData: FormData) => {
    const productData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      brand: formData.get("brand") as string,
      category: formData.get("category") as string,
      stock: Number(formData.get("stock")),
    };

    try {
      productSchema.parse(productData);
      setValidationErrors({});

      let success;
      if (isEdit) {
        success = await updateProduct(product.id, productData);
      } else {
        success = await addProduct(productData);
      }

      if (success) {
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0] as string] = issue.message;
          }
        });
        setValidationErrors(errors);
      }
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEdit ? t.products?.editProduct : t.products?.addNewProduct}
    >
      <form action={handleSubmit}>
        <AlertMessage message={productState.message} />
        <AlertMessage error={productState.error} />
        <div className="space-y-4">
          <FormField
            name="title"
            label={t.products?.title}
            type="text"
            defaultValue={product?.title}
            required
            error={validationErrors.title}
          />

          <FormField
            name="description"
            label={t.products?.description}
            type="textarea"
            defaultValue={product?.description}
            rows={3}
            required
            error={validationErrors.description}
          />

          <FormGrid columns={2} gap={4}>
            <FormField
              name="price"
              label={t.products?.price}
              type="number"
              defaultValue={product?.price}
              min={0}
              step={0.01}
              required
              error={validationErrors.price}
            />

            <FormField
              name="stock"
              label={t.products?.stock}
              type="number"
              defaultValue={product?.stock}
              min={0}
              required
              error={validationErrors.stock}
            />
          </FormGrid>

          <FormGrid columns={2} gap={4}>
            <FormField
              name="brand"
              label={t.products?.brand}
              type="text"
              defaultValue={product?.brand}
              required
              error={validationErrors.brand}
            />

            <FormField
              name="category"
              label={t.products?.category}
              type="text"
              defaultValue={product?.category}
              required
              error={validationErrors.category}
            />
          </FormGrid>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            variant="warning"
            size="default"
            onClick={onClose}
            disabled={productState.isLoading}
            className="flex-1"
          >
            {t.common?.cancel}
          </Button>
          <Button
            type="submit"
            variant="success"
            size="default"
            disabled={productState.isLoading}
            className="flex-1"
          >
            {productState.isLoading
              ? t.common?.saving
              : isEdit
                ? t.products?.editProduct
                : t.products?.addProduct}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
