import Form from "../../../components/Form/Form";
import { Card, CardContent } from "../../../components/ui/card";
import { TabsContent } from "../../../components/ui/tabs";

const CreateNew = () => {
  return (
    <div className="ManageProfile-create">
      {" "}
      <TabsContent value="create">
        <Card>
          <CardContent>
            <Form></Form>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default CreateNew;
