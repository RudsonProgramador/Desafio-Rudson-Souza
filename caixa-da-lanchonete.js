class CaixaDaLanchonete {
    constructor() {
      this.cardapio = {
        cafe: { descricao: "Cafe", valor: 3.0 },
        chantily: { descricao: "Chantily (extra do Cafe)", valor: 1.5 },
        suco: { descricao: "Suco Natural", valor: 6.2 },
        sanduiche: { descricao: "Sanduiche", valor: 6.5 },
        queijo: { descricao: "Queijo (extra do Sanduiche)", valor: 2.0 },
        salgado: { descricao: "Salgado", valor: 7.25 },
        combo1: { descricao: "1 Suco e 1 Sanduiche", valor: 9.5 },
        combo2: { descricao: "1 Cafe e 1 Sanduiche", valor: 7.5 },
      };
    }
  
    calcularValorDaCompra(formaDePagamento, itens) {
      if (itens.length === 0) {
        return "Não ha itens no carrinho de compra!";
      }
  
      let valorTotal = 0;
  
      for (const itemPedido of itens) {
        const [codigo, quantidade] = itemPedido.split(",");
  
        if (!this.cardapio[codigo] || isNaN(quantidade) || parseInt(quantidade) <= 0) {
          return "Item invalido!";
        }
  
        valorTotal += this.cardapio[codigo].valor * parseInt(quantidade);
  
        // Verificar se o item é extra e se o principal correspondente está no carrinho
        if (codigo !== "chantily" && codigo !== "queijo" && !itens.includes("sanduiche,1")) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
  
      switch (formaDePagamento) {
        case "dinheiro":
          valorTotal *= 0.95; // Aplicar desconto de 5% no pagamento em dinheiro
          break;
        case "credito":
          valorTotal *= 1.03; // Acrescentar 3% no pagamento a crédito
          break;
        case "debito":
          break; // Nenhuma modificação para pagamento a débito
        default:
          return "Forma de pagamento invalida!";
      }
  
      // Arredondar para duas casas decimais
      valorTotal = parseFloat(valorTotal.toFixed(2));
  
      return `R$ ${valorTotal.toFixed(2)}`;
    }
  }
  
  export { CaixaDaLanchonete };
