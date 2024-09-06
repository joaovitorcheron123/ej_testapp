import Login from '../pageObjects/loginPage.cy';
import Inventory from '../pageObjects/inventoryPage.cy';

describe('Testes de Inventário usando Page Objects', () => {
  const loginPage = new Login();
  const inventoryPage = new Inventory();

  beforeEach(() => {
    cy.fixture('credentials').then((credentials) => {
      loginPage.visit();
      loginPage.loginFunc(credentials.username, credentials.password);
      inventoryPage.verifyInventoryPageLoaded();
    });
  });

  it('Deve adicionar um item ao carrinho', () => {
    inventoryPage.addItemToCart(0);
    inventoryPage.verifyCartItemCount(1);
  });

  it('Deve remover um item do carrinho', () => {
    inventoryPage.addItemToCart(0);
    inventoryPage.removeItemFromCart(0);
    inventoryPage.verifyCartIsEmpty();
  });

  it('Deve ordenar os produtos por preço (baixo para alto)', () => {
    inventoryPage.sortBy('Price (low to high)');
    inventoryPage.verifyProductsSortedByPrice();
  });

  it('Deve verificar se os produtos têm imagem e nome', () => {
    inventoryPage.verifyItemsHaveImageAndName();
  });

  it('Deve permitir a navegação até a página de detalhes de um produto', () => {
    inventoryPage.clickOnFirstProduct();
    inventoryPage.verifyProductDetailsPage();
  });

  it('Deve mostrar a quantidade correta de itens no carrinho após múltiplos itens serem adicionados', () => {
    [0, 1, 2].forEach(index => inventoryPage.addItemToCart(index));
    inventoryPage.verifyCartItemCount(3);
  });

  it('Deve permitir a navegação para o carrinho e iniciar o checkout', () => {
    inventoryPage.addItemToCart(0);
    inventoryPage.goToCart();
    inventoryPage.proceedToCheckout();
  });

  it('Deve impedir o login com usuário bloqueado', () => {
    loginPage.logoutFunc();
    loginPage.loginFunc('locked_out_user', 'secret_sauce');
    loginPage.verifyLoginError();
  });
});
