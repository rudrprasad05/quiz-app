import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

function SaveFormBtn({ id }: { id: string }) {
  // const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      // const jsonElements = JSON.stringify(elements);
      // await UpdateFormContent(id, jsonElements);
      toast("Your form has been saved");
    } catch (error) {
      toast("Something went wrong");
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <Save className="h-4 w-4" />
      Save
      {loading && <Loader2 className="animate-spin" />}
    </Button>
  );
}

export default SaveFormBtn;
