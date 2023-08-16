class CaixaDaLanchonete {
    constructor() {
        this.itensCardapio = {
            cafe: ("Café", 3.00),
            chantily: ("Chantily(extra do café)", 1.50),
            suco: ('Suco Natural', 6.20),
            sanduiche: ('Sanduíche', 6.50),
            queijo: ('Queijo(extra do sanduíche)', 2.00),
            salgado: ('Salgado', 7.25),
            combo1: ('1 Suco e 1 Sanduíche', 9.50),
            combo2: ('1 Café e 1 Sanduíche', 7.50)
        };
        
        this.ItensExtra = {
            chantily: ("Chantily(extra do café)", 1.50,"cafe"),
            queijo: ('Queijo(extra do sanduíche)', 2.00, "sanduiche")
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        let total = 0;

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        if (!['debito', 'credito', 'dinheiro'].includes(formaDePagamento)){
            return "Forma de pagamento inválida!";
        }

        for (let item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!this.itensCardapio[codigo]) {
                return "Item inválido!";
            }

            if (Number(quantidade) <= 0) {
                return "Quantidade inválida!";
            }

            if (this.ItensExtra[codigo] && !itens.some(i => i.startsWith(this.ItensExtra[codigo]))) {
                return "Item extra não pode ser pedido sem o principal";
            }

            total += this.itensCardapio[codigo] * Number(quantidade);
        }

        if (formaDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (formaDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };