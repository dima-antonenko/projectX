require 'test_helper'

class AdvertCategoriesControllerTest < ActionController::TestCase
  setup do
    @advert_category = advert_categories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:advert_categories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create advert_category" do
    assert_difference('AdvertCategory.count') do
      post :create, advert_category: {  }
    end

    assert_redirected_to advert_category_path(assigns(:advert_category))
  end

  test "should show advert_category" do
    get :show, id: @advert_category
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @advert_category
    assert_response :success
  end

  test "should update advert_category" do
    patch :update, id: @advert_category, advert_category: {  }
    assert_redirected_to advert_category_path(assigns(:advert_category))
  end

  test "should destroy advert_category" do
    assert_difference('AdvertCategory.count', -1) do
      delete :destroy, id: @advert_category
    end

    assert_redirected_to advert_categories_path
  end
end
