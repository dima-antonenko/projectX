require 'test_helper'

class AdvertPositionsControllerTest < ActionController::TestCase
  setup do
    @advert_position = advert_positions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:advert_positions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create advert_position" do
    assert_difference('AdvertPosition.count') do
      post :create, advert_position: {  }
    end

    assert_redirected_to advert_position_path(assigns(:advert_position))
  end

  test "should show advert_position" do
    get :show, id: @advert_position
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @advert_position
    assert_response :success
  end

  test "should update advert_position" do
    patch :update, id: @advert_position, advert_position: {  }
    assert_redirected_to advert_position_path(assigns(:advert_position))
  end

  test "should destroy advert_position" do
    assert_difference('AdvertPosition.count', -1) do
      delete :destroy, id: @advert_position
    end

    assert_redirected_to advert_positions_path
  end
end
