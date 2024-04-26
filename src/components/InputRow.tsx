import { IonCol, IonLabel, IonRow } from "@ionic/react";
import Input, { InputProps } from "./Input";

interface InputRowProps {
    label: string;
    input: InputProps;
}

const InputRow = (props: InputRowProps)=> {
    return (
        <IonRow style={{marginTop: '18px'}} >
            <IonCol>
              <div>
                <IonLabel>{props.label}</IonLabel>
                <div style={{marginTop: '8px'}} >
                  <Input {...props.input} />
                </div>
              </div>
            </IonCol>
        </IonRow>
    )
}

export default InputRow;