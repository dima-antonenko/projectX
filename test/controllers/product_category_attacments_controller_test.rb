require 'test_helper'

class ProductCategoryAttacmentsControllerTest < ActionController::TestCase
  setup do
    @product_category_attacment = product_category_attacments(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:product_category_attacments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create product_category_attacment" do
    assert_difference('ProductCategoryAttacment.count') do
      post :create, product_category_attacment: {  }
    end

    assert_redirected_to product_category_attacment_path(assigns(:product_category_attacment))
  end

  test "should show product_category_attacment" do
    get :show, id: @product_category_attacment
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @product_category_attacment
    assert_response :success
  end

  test "should update product_category_attacment" do
    patch :update, id: @product_category_attacment, product_category_attacment: {  }
    assert_redirected_to product_category_attacment_path(assigns(:product_category_attacment))
  end

  test "should destroy product_category_attacment" do
    assert_difference('ProductCategoryAttacment.count', -1) do
      delete :destroy, id: @product_category_attacment
    end

    assert_redirected_to product_category_attacments_path
  end
end
