import { SaveQuiz } from "@/actions/quiz";
import { Button } from "@/components/ui/button";
import { QuesitonContext } from "@/context/QuesitonContext";
import { Loader2, Save } from "lucide-react";
import { useContext, useTransition } from "react";
import { toast } from "sonner";

function SaveFormBtn({ id }: { id: string }) {
  const { questions } = useContext(QuesitonContext);
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      console.log(questions);
      toast("Your form has been saved");
      await SaveQuiz(id, questions);
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
