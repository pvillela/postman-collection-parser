package testsupport

type MethodPath struct {
	method string
	path   string
}

type InOUt struct {
	inType  string
	outType string
}

var TypeMap = map[MethodPath]InOUt{
	{"POST", "/users/login"}:                   {"rpc.UserAuthenticateIn", "rpc.UserOut"},
	{"POST", "/users"}:                         {"rpc.UserRegisterIn", "rpc.UserOut"},
	{"GET", "/user"}:                           {"", "rpc.UserOut"},
	{"PUT", "/user"}:                           {"rpc.UserUpdateIn", "rpc.UserOut"},
	{"GET", "/profiles/:username"}:             {"string", "rpc.ProfileOut"},
	{"POST", "/profiles/:username/follow"}:     {"string", "rpc.ProfileOut"},
	{"DELETE", "/profiles/:username/follow"}:   {"string", "rpc.ProfileOut"},
	{"GET", "/articles"}:                       {"rpc.ArticleCriteria", "rpc.ArticlesOut"},
	{"GET", "/articles/feed"}:                  {"rpc.ArticlesFeedIn", "rpc.ArticlesOut"},
	{"GET", "/articles/:slug"}:                 {"string", "rpc.ArticleOut"},
	{"POST", "/articles"}:                      {"rpc.ArticleCreateIn", "rpc.ArticleOut"},
	{"PUT", "/articles/:slug"}:                 {"rpc.ArticleUpdateIn", "rpc.ArticleOut"},
	{"DELETE", "/articles/:slug"}:              {"string", "types.Unit"},
	{"POST", "/articles/:slug/comments"}:       {"rpc.CommentAddIn", "rpc.CommentOut"},
	{"GET", "/articles/:slug/comments"}:        {"string", "rpc.CommentsOut"},
	{"DELETE", "/articles/:slug/comments/:id"}: {"rpc.CommentDeleteIn", "types.Unit"},
	{"POST", "/articles/:slug/favorite"}:       {"string", "rpc.ArticleOut"},
	{"DELETE", "/articles/:slug/favorite"}:     {"string", "rpc.ArticleOut"},
	{"GET", "/tags"}:                           {"types.Unit", "rpc.TagsOut"},
}
