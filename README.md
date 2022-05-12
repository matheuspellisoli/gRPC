# gRPC

#### Vantagens do gRPC
Como pudemos ver, o gRPC tem várias vantagens sobre o modelo ReST tradicional:

- Mais leve e mais rápido por utilizar codificação binária e HTTP/2
- Multi plataforma com a mesma interface de contratos
- Funciona em muitas plataformas com pouco ou nenhum overhead
- O código é auto documentado
- Implementação relativamente fácil depois do desenvolvimento inicial
- Excelente para trabalhos entre times que não vão se encontrar, principalmente para definir contratos de projetos open source.
#### Problemas
Assim como toda a tecnologia, o gRPC não é uma bala de prata e não resolve todos os problemas, temos alguns defeitos:

- O protobuf não possui um package manager para poder gerenciar as dependências entre arquivos de interface
- Exige uma pequena mudança de paradigma em relação ao modelo ReST
- Curva de aprendizado inicial é mais complexa
- Não é uma especificação conhecida por muitos
- Por conta de não ser muito conhecido, a documentação é esparsa
- A arquitetura de um sistema usando gRPC pode se tornar um pouco mais complexa

#### O que são buffers de protocolo?

Os protobuf são o mecanismo extensível, neutro em termos de linguagem e plataforma do Google para serializar dados estruturados – pense em XML, mas menor, mais rápido e mais simples. Você define como deseja que seus dados sejam estruturados uma vez e, em seguida, pode usar o código-fonte gerado especial para escrever e ler facilmente seus dados estruturados de e para uma variedade de fluxos de dados e usando uma variedade de linguagens.

representação do Json no protobuf

```proto
message Pessoa{
    uint64 id = 1;
    string  = 2;
}
```

Json de pessoas

```json
{
  "id": 1,
  "email:"hello@lsantos.dev"
}
```

#### Encoding

Quando utilizamos o compilador do protobuf (chamado de protoc), podemos rodar o comando a seguir usando o nosso exemplo anterior: echo 'name: "Lucas";age: 26' | protoc --encode=Name name.proto > name.bin.

Isso vai criar um arquivo binário com o nome name.bin, se abrirmos o arquivo binário em um hex viewer (como o do VSCode), teremos a seguinte cadeia de bits:

compilando o protocolo
```bash
protoc --js_out=import_style=commonjs,binary:. ./pessoa.proto

```
O compilador vai criar um arquivo pessoa_pb.js

ao serializar o json vamos ter o resultado abaixo.

    codigo serializar esta na no aquivo main.js no exemplo 1

```
  8,   1,  18,  17, 104, 101,
  108, 108, 111,  64, 108, 115,
  97, 110, 116, 111, 115,  46,
  100, 101, 118
```

##### Referências

https://blog.lsantos.dev/guia-grpc-1/

https://blog.lsantos.dev/o-guia-do-grpc-2/

https://grpc.io/docs/protoc-installation/

https://developers.google.com/protocol-buffers/docs/encoding/
