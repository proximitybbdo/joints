describe "KickerApp", ->
  beforeEach ->
    @app = new KickerApp()

  it "should be an instance of KickerApp", ->
    expect(@app).to.be.instanceof(KickerApp)

  it "should be defined", ->
    expect(@app).to.exist

  it "should have an init function", ->
    expect(@app).to.respondTo 'init'
