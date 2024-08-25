const PropertyDetailPage = ({ params }: { params: { propertyId: string } }) => {
  const { propertyId } = params;

  return <div>{`${propertyId} detail page`}</div>;
};

export default PropertyDetailPage;
