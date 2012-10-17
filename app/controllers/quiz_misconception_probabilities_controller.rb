class QuizMisconceptionProbabilitiesController < ApplicationController

	def update
    @misconception_probability = QuizMisconceptionProbability.find(params[:id])
    if params[:quiz_misconception_limit][:high_probability_id]
    	limit_id = params[:quiz_misconception_limit][:high_probability_id].to_f
    	limit = params[:quiz_misconception_limit][:high_probability_limit].to_f

    	if limit > 0 && limit < 1

	    	hp = @misconception_probability.high_probability || {}
	    	hp.merge!({"#{limit_id}" => "#{limit}"})

	    	@misconception_probability.high_probability = hp
	    	@misconception_probability.save!

	    end
    	render :json => @misconception_probability.to_json
    elsif params[:quiz_misconception_limit][:somewhat_probability_id]
    	limit_id = params[:quiz_misconception_limit][:somewhat_probability_id].to_f
    	limit = params[:quiz_misconception_limit][:somewhat_probability_limit].to_f

    	if limit > 0 && limit < 1

	    	sp = @misconception_probability.somewhat_probability || {}
	    	sp.merge!({"#{limit_id}" => "#{limit}"})

	    	@misconception_probability.somewhat_probability = sp
	    	@misconception_probability.save!
	    	
	    end

    	render :json => @misconception_probability.to_json
    else
    	render :json => @misconception_probability.errors.to_json, :status => :bad_request
    end
  end
end
