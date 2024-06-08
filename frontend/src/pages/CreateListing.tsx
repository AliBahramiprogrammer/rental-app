import { useMutation } from "@tanstack/react-query";
import Navbar from "../components/Navbar"
import ManageListingForm from "../forms/ManageListingForm/ManageListingForm";
import * as apiClient from "../api-client"
import "../styles/CreateListing.scss";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateListing = () => {

  const navigate = useNavigate()

  const { isPending , mutateAsync } = useMutation({
    mutationFn: apiClient.addMyListing,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error)
    }
      
  })



  const handleSave = (placeFormData: FormData) => {
    // mutate(placeFormData);

    toast.promise(
      mutateAsync(placeFormData),
       {
         loading: 'Saving...',
         success: <b>Publish Listing successfully</b>,
         error: <b>Publish Listing failed</b>,
       }
     );

  }

  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <ManageListingForm onSave={handleSave} isLoading={isPending} />
      </div>
    </>
  )
}

export default CreateListing