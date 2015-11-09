class Sellers::ProductQuestionsController < SellersController

  before_action :set_product_question, only: [:show, :destroy, :delete]


  def index
    @product_questions = ProductQuestion.where(seller_id: current_seller.id, archive: false).paginate(:page => params[:page], :per_page => 20)
  end

  def show
    @product_question.update_attribute(:viewed, true)
  end

  def destroy
    @product_question.update_attribute(:archive, true)
    respond_to do |format|
      format.html { redirect_to :back, notice: 'Информация обновлена' }
    end
  end

  private

  def product_question_params
    params.require(:product_question).permit(:archive)
  end

  def set_product_question
    @product_question = ProductQuestion.find(params[:id])
  end

end
