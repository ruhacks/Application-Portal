export default function EventColumns(events, CONTAINER_WIDTH = 600) {
    // Sort the events
    this.sevents = [...events].sort((a, b) => {
        if (a["start"] > b["start"]) return 1;
        else if (a["start"] < b["start"]) return -1;
        else if (a["end"] > b["end"]) return 1;
        else if (a["end"] < b["end"]) return -1;
        return 0;
    });
    this.resultArr = [];
    this.startWhereLeftOff = 0;
    this.currColArr = [];
    this.pivot = null;
    this.CONTAINER_WIDTH = CONTAINER_WIDTH;
    this.atLeastOneCollision = false;
    const generateDayEvents = () => {
        do {
            this.pivot = this.sevents.shift();
            _setPivotProperties();
            this.currColArr.push(this.pivot);
            if (this.sevents.length > 0) _generateColumnEvents();
            this.resultArr.push(this.currColArr);
            this.currColArr = [];
            this.startWhereLeftOff = 0;
        } while (this.sevents.length);
    };

    const _generateColumnEvents = () => {
        do {
            var newPivot = _determineCollisions();
            if (newPivot) {
                this.pivot = newPivot.evt;
                this.startWhereLeftOff = newPivot.evtIndex;
                if (this.sevents.splice(newPivot.evtIndex, 1))
                    this.startWhereLeftOff--;
                if (this.startWhereLeftOff < 0) this.startWhereLeftOff = 0;
                _setPivotProperties(this.pivot);
                this.currColArr.push(this.pivot);
            }
            var condition = this.atLeastOneCollision
                ? this.startWhereLeftOff < this.sevents.length - 1
                : this.startWhereLeftOff < this.sevents.length;
        } while (condition);
    };
    const _determineCollisions = () => {
        for (var i = this.startWhereLeftOff; i < this.sevents.length; i++) {
            if (_noCollision(this.pivot, this.sevents[i])) {
                return {
                    evt: this.sevents[i],
                    evtIndex: i,
                };
            } else {
                this.atLeastOneCollision = true;
                this.startWhereLeftOff = i;
            }
        }
    };
    const _noCollision = (pivot, evt) => evt["start"] >= pivot.end;

    const _setPivotProperties = () => {
        this.pivot.top = this.pivot.start;
        this.pivot.height = this.pivot.end - this.pivot.start;
        this.pivot.width = !this.resultArr.length
            ? this.CONTAINER_WIDTH
            : Math.floor(this.CONTAINER_WIDTH / (this.resultArr.length + 1));
        this.pivot.left = this.pivot.width * this.resultArr.length + 10;
    };

    const adjustWidth = (order = "last", times = 2) => {
        do {
            if (order === "last") {
                for (
                    var colIndex = this.resultArr.length - 1;
                    colIndex > 0;
                    colIndex--
                ) {
                    var comparatorColIndex = colIndex - 1;
                    _columnIterator(colIndex, comparatorColIndex);
                }
                order = "first";
            } else {
                for (
                    var colIndex = 0;
                    colIndex < this.resultArr.length - 1;
                    colIndex++
                ) {
                    var comparatorColIndex = colIndex + 1;
                    _columnIterator(colIndex, comparatorColIndex);
                }
                order = "last";
            }
            times--;
        } while (times > 0);
    };
    const _columnIterator = (colIndex, comparatorColIndex) => {
        for (var i = 0; i < this.resultArr[colIndex].length; i++) {
            // nth column iteration
            for (
                var j = 0;
                j < this.resultArr[comparatorColIndex].length;
                j++
            ) {
                var condition1 = false;
                var condition2 = false;
                var condition3 = false;
                condition1 =
                    this.resultArr[colIndex][i]["start"] >
                        this.resultArr[comparatorColIndex][j]["start"] &&
                    this.resultArr[colIndex][i]["start"] <
                        this.resultArr[comparatorColIndex][j]["end"];
                condition2 =
                    (this.resultArr[colIndex][i]["start"] >=
                        this.resultArr[comparatorColIndex][j]["start"] &&
                        this.resultArr[colIndex][i]["end"] <=
                            this.resultArr[comparatorColIndex][j]["end"]) ||
                    (this.resultArr[colIndex][i]["start"] <=
                        this.resultArr[comparatorColIndex][j]["start"] &&
                        this.resultArr[colIndex][i]["end"] >=
                            this.resultArr[comparatorColIndex][j]["end"]);
                condition3 =
                    this.resultArr[colIndex][i]["end"] >
                        this.resultArr[comparatorColIndex][j]["start"] &&
                    this.resultArr[colIndex][i]["end"] <
                        this.resultArr[comparatorColIndex][j]["end"];
                if (condition1 || condition2 || condition3) {
                    if (
                        this.resultArr[colIndex][i]["width"] >
                        this.resultArr[comparatorColIndex][j]["width"]
                    ) {
                        this.resultArr[colIndex][i]["width"] = this.resultArr[
                            comparatorColIndex
                        ][j]["width"];
                    }
                    if (
                        this.resultArr[colIndex][i]["width"] <
                        this.resultArr[comparatorColIndex][j]["width"]
                    ) {
                        this.resultArr[comparatorColIndex][j][
                            "width"
                        ] = this.resultArr[colIndex][i]["width"];
                    }
                    this.resultArr[comparatorColIndex][j]["left"] =
                        this.resultArr[comparatorColIndex][j]["width"] *
                            comparatorColIndex +
                        10;
                }
            }
        }
    };
    generateDayEvents();
    adjustWidth();
    return this.resultArr.reduce((x, y = []) => [...x, ...y]);
}
