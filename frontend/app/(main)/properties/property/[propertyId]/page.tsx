import PropertyPage from "@/components/template/propertyPage/PropertyPage";

const PropertyDetailPage = ({ params }: { params: { propertyId: string } }) => {
  const { propertyId } = params;

  return (
    <div>
      <PropertyPage />
    </div>
  );
};

export default PropertyDetailPage;
