require 'test_helper'

class MiniCartsControllerTest < ActionController::TestCase
  setup do
    @mini_cart = mini_carts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:mini_carts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create mini_cart" do
    assert_difference('MiniCart.count') do
      post :create, mini_cart: {  }
    end

    assert_redirected_to mini_cart_path(assigns(:mini_cart))
  end

  test "should show mini_cart" do
    get :show, id: @mini_cart
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @mini_cart
    assert_response :success
  end

  test "should update mini_cart" do
    patch :update, id: @mini_cart, mini_cart: {  }
    assert_redirected_to mini_cart_path(assigns(:mini_cart))
  end

  test "should destroy mini_cart" do
    assert_difference('MiniCart.count', -1) do
      delete :destroy, id: @mini_cart
    end

    assert_redirected_to mini_carts_path
  end
end
