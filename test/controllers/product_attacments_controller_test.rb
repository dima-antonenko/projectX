require 'test_helper'

class ProductAttacmentsControllerTest < ActionController::TestCase
  setup do
    @product_attacment = product_attacments(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:product_attacments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create product_attacment" do
    assert_difference('ProductAttacment.count') do
      post :create, product_attacment: {  }
    end

    assert_redirected_to product_attacment_path(assigns(:product_attacment))
  end

  test "should show product_attacment" do
    get :show, id: @product_attacment
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @product_attacment
    assert_response :success
  end

  test "should update product_attacment" do
    patch :update, id: @product_attacment, product_attacment: {  }
    assert_redirected_to product_attacment_path(assigns(:product_attacment))
  end

  test "should destroy product_attacment" do
    assert_difference('ProductAttacment.count', -1) do
      delete :destroy, id: @product_attacment
    end

    assert_redirected_to product_attacments_path
  end
end
