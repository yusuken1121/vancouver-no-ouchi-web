import PropertyPage from "@/components/template/propertyPage/PropertyPage";

const PropertyDetailPage = ({ params }: { params: { propertyId: string } }) => {
  const { propertyId } = params;

  return (
    <div>
      {`${propertyId} detail page`}
      <PropertyPage />
    </div>
  );
};

export default PropertyDetailPage;
