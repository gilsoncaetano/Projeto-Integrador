// import * as React from "react";
// import { Text, View } from "../components/Themed";
// import { Formik, Field, Form } from "formik";
// import {schema} from "./schema";
// import {
//   Picker,
//   Button,
//   StyleSheet,
//   TextInput,
//   Image,
//   ActivityIndicator,
//   ImageBackground,
//   unstable_enableLogBox,
//   Alert,
// } from "react-native";


// export default function Endereco({navigation }) {
//   function onSubmit() {
   
//   }

//   function onBlurCep(ev, setFieldValue) {
//     const { value } = ev.target;
//     const cep = value?.replace(/[^0-9]/g, "");

//     if (cep?.length !== 8) {
//       return;
//     }
//     fetch(`https://viacep.com.br/ws/${cep}/json/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setFieldValue("logradouro", data.logradouro);
//         setFieldValue("bairro", data.bairro);
//         setFieldValue("cidade", data.localidade);
//         setFieldValue("uf", data.uf);
//         // console.log(data)
//       });
//   }

//   return (
//     <View style={estilo.area}>
//       <Formik
  
//         onSubmit={onSubmit}
//         validateOnMount
//         initialValues={{
//           name: "",
//           email: "",
//         }}
//         render={({ isValid, setFieldValue }) => (
//           <Form>

//         <View style={estilo.inputxt}>
//         <Text style={estilo.txt1}>CEP:</Text>
//         <TextInput style={estilo.input6} onBlur={(ev) => onBlurCep(ev, setFieldValue)}></TextInput>
//         {/* <Field
//                 name="cep"
//                 type="text"
//                 onBlur={(ev) => onBlurCep(ev, setFieldValue)}
//               /> */}
//         </View>
//             <div className="form-contral-group">
//             <Text style={estilo.dados}> CEP</Text>
              
//             </div>
//             <div className="form-contral-group">
//             <Text style={estilo.dados}> Logradouro</Text>
//               <Field name="logradouro" type="text" />
//             </div>
//             <div className="form-contral-group">
//             <Text style={estilo.dados}>Número</Text>
//               <Field name="numero" type="text" />
//             </div>
//             <div className="form-contral-group">
//             <Text style={estilo.dados}>Complemento</Text>
//               <Field name="complemento" type="text" />
//             </div>
//             <div className="form-contral-group">
//             <Text style={estilo.dados}> Bairro</Text>
//               <Field name="bairro" type="text" />
//             </div>
//             <div className="form-contral-group">
//             <Text style={estilo.dados}> Cidade</Text>
//               <Field name="cidade" type="text" />
//             </div>

//             <div className="form-contral-group">
//             <Text style={estilo.dados}> Estado</Text>
//               <Field component="select" name="uf">
                
//                 <option value="SP">São Paulo</option>
//                 <option value="SC">Santa Catarina</option>
//                 <option value="PA">Pará</option>
//                 <option value="BH">Belo Horizonte</option>
//               </Field>
//             </div>

//             <button type="submit" disabled={!isValid}>
//               Enviar
//             </button>
//           </Form>
//         )}
//       />
//     </View>
//   );
// }
// const estilo = StyleSheet.create({
//   dados: {
//     color: "white",
//     marginTop: 40,
//     fontSize: 25,
//     margin: 14,
//     marginLeft: "auto",
//     marginRight: "auto",
//   },
//   area: {
//     backgroundColor: "white",
//     flex: 1,
//     alignContent: "center",
//     justifyContent: "center",
//   },
//   input6:{
//     height: 39,
//     marginTop:-21,
//     fontSize:20,
//     width: "77%",
//     marginLeft:63,
//   },
//   inputxt: {
//     padding:10,
//     height: 40,
//     borderRadius: 4,
//     marginBottom:10,
//     width: "90%",
//     marginLeft: "auto",
//     marginRight: "auto",
//   },
//   txt1:{
//     marginBottom:-10,
//     marginTop:-4,
//     paddingLeft:10,
//     fontSize:21,
//   },
// });

// //export default App;
