import { resetPassword } from '../actions'

const ResetPassword = () => {

    return (
    <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h2 className="card-title text-center">Reset Password</h2>
              <form className="column">
                <label htmlFor="email">Email</label>
                <input
                  className={`form-control`}
                  id="email"
                  name="email"
                  placeholder="jane@acme.com"
                  type="email"
                />
                <button className="btn btn-primary btn-lg btn-block mt-3" formAction={resetPassword}>
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>       
    )
}
export default ResetPassword;