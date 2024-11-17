// import { useModalHandler, useYup } from "@/hooks";
// import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View, ViewStyle } from "react-native";
// import * as S from './style'
// import { Modal } from "@/components/Modal";
// import { Controller, useForm } from "react-hook-form";
// import { Priority } from "@/types";
// import { Input } from "@/components";
// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";
// import { RadioButton, } from 'react-native-paper';

// type FormValues = {
//     title: string;
//     description: string;
//     datetime: string;
//     time: string;
//     notificationType: string;
//     // priority: Priority;
// }


// export function ModalAddPersonalEvent() {
//     const { closeModal, isModalVisible, openModal } = useModalHandler()

//     const { resolver } = useYup<FormValues>((yup) => {
//         return yup.object().shape({
//             title: yup.string().required(),
//             description: yup.string().required(),
//             datetime: yup.string().required(),
//             notificationType: yup.string().required(),
//         })
//     })

//     const { control } = useForm<FormValues>({
//         resolver,
//         defaultValues: {
//             title: "",
//             description: "",
//             datetime: "",
//             notificationType: "",
//             // priority: ,
//         }
//     })


//     return (
//         <>
          
//             <Modal visible={isModalVisible} closeModal={closeModal} title="Criar evento pessoal">
//                 <KeyboardAvoidingView
//                     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

//                     <Controller
//                         control={control}
//                         name="title"
//                         render={({ field: { onChange, value } }) => (
//                             <Input.Text
//                                 required
//                                 placeholder="Ex.: Reunião com a equipe"
//                                 label="Título"
//                                 onChangeText={onChange}
//                                 value={value}
//                                 type="gray"
//                             />
//                         )}
//                     />
//                     <Controller
//                         control={control}
//                         name="description"
//                         render={({ field: { onChange, value } }) => (
//                             <Input.TextArea
//                                 required
//                                 placeholder="asdçaslc ç"
//                                 label="Descrição"
//                                 onChangeText={onChange}
//                                 value={value}
//                                 type="gray"
//                             />
//                         )}
//                     />
//                     <Controller
//                         control={control}
//                         name="datetime"
//                         render={({ field: { onChange, value, onBlur } }) => (
//                             <Input.DatePicker
//                                 label="Data/Hora do evento"
//                                 placeholder="Escolha uma data e horário"
//                                 mode="datetime"
//                                 textColor="dark"
//                                 type="gray"
//                                 required
//                                 editable={false}
//                                 onBlur={onBlur}
//                                 onChangeText={value => onChange(value)}
//                                 onChange={value => onChange(value)}
//                                 value={value ? format(new Date(value), "dd/MM/yyyy - HH:mm", { locale: ptBR }) : ""}
//                                 getCurrentDate={(date) => onChange(date ? date.toISOString() : "")}
//                             />
//                         )}
//                     />

//                     {/* <Controller
//                         control={control}
//                         name="notificationType"
//                         render={({ field: { onChange, value } }) => (
//                             <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
//                                 <View>
//                                     <Text>First</Text>
//                                     <RadioButton value="first" />
//                                 </View>
//                                 <View>
//                                     <Text>Second</Text>
//                                     <RadioButton value="second" />
//                                 </View>
//                             </RadioButton.Group>
//                         )}
//                     /> */}



//                 </KeyboardAvoidingView>

//             </Modal >

//         </>
//     )
// }