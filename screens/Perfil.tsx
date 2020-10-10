import * as React from "react";
import { Text, View } from "../components/Themed";

export default function Perfil({ route }) {
  return (
    <View>
      <Text>Estamos dentro de pedido realizado</Text>
      <Text> Dados do Usuario</Text>
    </View>
  );
}

// export default function Cadastro({ route }) {
//   const { idusuario } = route.params;
//   const { usuario } = route.params;
//   const { senha } = route.params;
//   const { foto } = route.params;
//   return (
//     <Stack.Navigator initialRouteName="Cadastrar">
//       <Stack.Screen name="Cadastro" component={Cadastrar} />
//     </Stack.Navigator>
//   );
// }

// <View style={estilo.area}>
// <ImageBackground
//   source={require("../img/camuflada.png")}
//   style={estilo.fundo}
// >
//   <Text>Estamos dentro de Detalhes de Produtos</Text>

//   <Text>Usuario: {usuario}</Text>
//   <Text>Senha: {senha}</Text>
//   <Text>Foto: {foto}</Text>

//   </View>
//   );
// }
