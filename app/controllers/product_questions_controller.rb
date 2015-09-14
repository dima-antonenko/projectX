class ProductQuestionsController < ApplicationController
  before_action :set_product_question, only: [:show, :edit, :update, :destroy]


  def new
    @product_question = ProductQuestion.new
  end


  def create
    @product_question = ProductQuestion.new(product_question_params)

    respond_to do |format|
      if @product_question.save
        format.html { redirect_to :back, notice: 'Спасибо за Ваш вопрос' }
      else
        format.html { redirect_to :back, notice: 'Произошла ошибка' }
      end
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product_question
      @product_question = ProductQuestion.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def product_question_params
      params[:product_question].permit(:name, :email, :phone, :skype, :question, :product_id)
    end
end
