function FeatureSettings() {
  return (
    <div className="grow">
      <h3 className="text-lg font-bold">Branding</h3>
      <h4 className=" text-xs text-gray-500 mt-2">
        Update which features this program has access to.
      </h4>
      <div className="my-5" />
      <div className="relative rounded-md p-3 hover:bg-gray-100 border border-gray-100">
        <h4 className="text-sm font-medium leading-5">Hero Image</h4>
        <h5 className=" text-xs text-gray-500 mt-2">
          This image will be displayed on the main banner.
        </h5>
      </div>
      <div className="relative rounded-md p-3 hover:bg-gray-100 border border-gray-100">
        <h4 className="text-sm font-medium leading-5">Base Thumbnail</h4>
        <h5 className=" text-xs text-gray-500 mt-2">
          This image will be displayed on the main banner.
        </h5>
      </div>
    </div>
  );
}

export default FeatureSettings;
