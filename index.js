const Assessment = require('@console/assessment-js')

Assessment.stripPrivateProperties = (excluedProperties, arr) => {
    if (arr && arr.length && excluedProperties && excluedProperties.length) {
        let res
        res = arr.map((item) => {
            if (typeof item == 'object' && item !== null) {
                const tmp = {}
                for (let k in item) {
                    if (!excluedProperties.includes(k)) {
                        tmp[k] = item[k]
                    }
                }
                return tmp
            } else {
                return item
            }
        })
        return res
    }
}


Assessment.excludeByProperty = (propName, arr) => {
    if (arr && arr.length && propName) {
        let res = []
        res = arr.filter((item) => {
            return !Object.keys(item).includes(propName)
        })
        return res
    }
}

Assessment.sumDeep = (arr) => {
    if (arr && arr.length) {
        let res = []
        res = arr.map((item) => {
            if (typeof item == 'object' && item !== null) {
                const temp = {}
                for (let k in item) {
                    if (Array.isArray(item[k])) {
                        temp[k] = item[k].reduce((acc, cur) => acc + cur.val, 0)
                    } else {
                        temp[k] = item[k]
                    }
                }
                return temp
            } else {
                return item
            }
        })
        return res
    }
}


Assessment.applyStatusColor = (colorMap, arr) => {
    if (colorMap && arr && arr.length) {
        let res = []
        arr.forEach(item => {
            const temp = { ...item }
            if (item.status) {
                const cur = item.status
                for (let k in colorMap) {
                    if (Array.isArray(colorMap[k])) {
                        temp.color = colorMap[k].includes(cur) ? k : null
                        if (temp.color) break
                    }
                }
                temp.color && res.push(temp)
            }
        });
        return res
    }
}

Assessment.createGreeting = function (cb, ...args) {
    const context = this
    if (typeof cb == 'function') {
        return function (...args2) {
            return cb.apply(context, args.concat(args2))
        }
    }
}


Assessment.setDefaults = (defaultProps) => {
    return function (obj) {
        if (typeof obj == 'object' && obj !== null && typeof defaultProps == 'object' && defaultProps !== null) {
            return {
                ...defaultProps,
                ...obj
            }
        }
    }
}


Assessment.fetchUserByNameAndUsersCompany = (name, services) => {
    const promise1 = new Promise(async (resolve, reject) => {
        try {
            const res = {}
            let users
            if (services && services.fetchUsers) {
                users = await services.fetchUsers()
                if (users && users.length) {
                    const tar = users.find((item) => item.name == name)
                    if (tar) {
                        res.user = tar
                        if (tar.companyId && services.fetchCompanyById) {
                            const comp = await services.fetchCompanyById(tar.companyId)
                            if (comp) {
                                res.company = comp
                            }
                        }
                    }
                }
            }
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })

    const promise2 = new Promise(async (resolve, reject) => {
        try {
            const res = {}
            if (services && services.fetchStatus) {
                const stat = await services.fetchStatus()
                if (stat) {
                    res.status = stat
                }
            }
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
    return Promise.all([promise1, promise2]).then((res) => {
        return {
            ...res[0], ...res[1]
        }
    })
}

module.exports = Assessment