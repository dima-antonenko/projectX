require 'test_helper'

class SiteVariablesControllerTest < ActionController::TestCase
  setup do
    @site_variable = site_variables(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:site_variables)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create site_variable" do
    assert_difference('SiteVariable.count') do
      post :create, site_variable: {  }
    end

    assert_redirected_to site_variable_path(assigns(:site_variable))
  end

  test "should show site_variable" do
    get :show, id: @site_variable
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @site_variable
    assert_response :success
  end

  test "should update site_variable" do
    patch :update, id: @site_variable, site_variable: {  }
    assert_redirected_to site_variable_path(assigns(:site_variable))
  end

  test "should destroy site_variable" do
    assert_difference('SiteVariable.count', -1) do
      delete :destroy, id: @site_variable
    end

    assert_redirected_to site_variables_path
  end
end
